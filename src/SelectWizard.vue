<template>
    <div class="search-subject">
        <div id="wizard-select" class="wizard-selector">
            <button v-if="!isSelectActive" type="button" class="wizard-selector__placeholder"
                @click.stop.prevent="activateSelect" @pointerdown.stop.prevent="activateSelect">
                Выберите предмет
            </button>
            <component v-else ref="selectRef" :is="selectComponent" v-model="selectedSubject" :options="subjects"
                :onVnodeMounted="onSelectMounted" @option-selected="onSelectSubject" placeholder="Выберите предмет">
                <template #no-options>
                    Не найдено
                </template>
            </component>
        </div>
        <!-- <a class="search-subject__btn button" :href="link">Найти</a> -->
    </div>
</template>

<script>
import { defineAsyncComponent, defineComponent, markRaw, nextTick } from 'vue';

const CACHE_KEY = 'selectWizardSubjects';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24;
let memoryCache = null;
let memoryCacheTs = 0;
let vueSelectPromise = null;

const loadVueSelectOnce = () => {
    if (!vueSelectPromise) {
        vueSelectPromise = import('vue3-select-component');
    }
    return vueSelectPromise;
};

const readCache = () => {
    if (memoryCache && Date.now() - memoryCacheTs < CACHE_TTL_MS) {
        return memoryCache;
    }
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.raw) || !parsed.ts) return null;
        if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
        memoryCache = parsed;
        memoryCacheTs = parsed.ts;
        return parsed;
    } catch (error) {
        error;
        return null;
    }
};

const writeCache = (payload) => {
    memoryCache = payload;
    memoryCacheTs = payload.ts;
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch (error) {
        error;
    }
};

export default defineComponent({
    name: 'SelectWizard',
    data() {
        return {
            selectedSubject: 0,
            subjects: markRaw([]),
            rawSubjects: null,
            isSelectActive: false,
            isSelectActivating: false,
            shouldOpenSelect: false,
            selectComponent: null
        }
    },
    computed: {
        link() {
            return "/wizard?id=" + this.selectedSubject;
        }
    },
    methods: {
        activateSelect() {
            if (this.isSelectActive) return;
            if (this.isSelectActivating) return;
            this.isSelectActivating = true;
            this.shouldOpenSelect = true;
            loadVueSelectOnce().then(() => {
                if (!this.selectComponent) {
                    this.selectComponent = defineAsyncComponent(() => loadVueSelectOnce());
                }
                this.isSelectActive = true;
                this.isSelectActivating = false;
                this.openSelectDropdown();
            }).catch(() => {
                this.isSelectActivating = false;
            });
        },
        onSelectMounted() {
            if (!this.shouldOpenSelect) return;
            this.shouldOpenSelect = false;
            this.openSelectDropdown();
        },
        openSelectDropdown() {
            let attemptsLeft = 240;
            const tryOpen = () => {
                const selectEl = this.$refs.selectRef && this.$refs.selectRef.$el ? this.$refs.selectRef.$el : null;
                if (!selectEl) {
                    attemptsLeft -= 1;
                    if (attemptsLeft > 0) requestAnimationFrame(tryOpen);
                    return;
                }
                const input = selectEl.querySelector('input.search-input') || selectEl.querySelector('input');
                const toggle = selectEl.querySelector('.dropdown-icon') || selectEl.querySelector('.control') || input || selectEl;
                if (input) input.focus();
                if (input) {
                    const downEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window });
                    input.dispatchEvent(downEvent);
                }
                if (toggle && typeof toggle.click === 'function') {
                    toggle.click();
                }
            };
            nextTick(() => requestAnimationFrame(tryOpen));
        },
        onSelectSubject(option) {
            const selectedValue = option && option.value != null ? option.value : option;
            if (selectedValue == null) return;
            const schedule = window.requestAnimationFrame || ((cb) => setTimeout(cb, 0));
            schedule(() => {
                window.location = "/wizard?id=" + selectedValue;
            });
        },
        setSubjectsIfChanged(nextSubjects) {
            if (this.subjects === nextSubjects) return;
            if (Array.isArray(this.subjects) && Array.isArray(nextSubjects) && this.subjects.length === nextSubjects.length) {
                let isSame = true;
                for (let i = 0; i < this.subjects.length; i += 1) {
                    const current = this.subjects[i];
                    const next = nextSubjects[i];
                    if (
                        current.value !== next.value ||
                        current.label !== next.label ||
                        current.code !== next.code ||
                        current.parent_id !== next.parent_id
                    ) {
                        isSame = false;
                        break;
                    }
                }
                if (isSame) return;
            }
            this.subjects = nextSubjects;
        },
        buildRawSubjects(data) {
            const raw = data.map((item) => ({
                label: item.title,
                value: item.id,
                code: item.code,
                parent_id: item.parent_id
            }));
            return markRaw(raw);
        },
        normalizeSubjects(raw) {
            const labelById = new Map();
            raw.forEach((item) => labelById.set(item.value, item.label));
            const normalized = raw.map((item) => {
                if (item.parent_id == null) return item;
                const parentLabel = labelById.get(item.parent_id);
                if (!parentLabel) return item;
                return { ...item, label: parentLabel + '. ' + item.label };
            });
            normalized.sort((a, b) => (a.label < b.label ? -1 : (a.label > b.label ? 1 : 0)));
            return markRaw(normalized);
        },
        scheduleIdle(work) {
            const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 0));
            schedule(() => work());
        },
        loadSubjects() {
            const cached = readCache();
            if (cached) {
                const cachedRaw = markRaw(cached.raw);
                this.rawSubjects = cachedRaw;
                this.setSubjectsIfChanged(cachedRaw);
                if (cached.normalized && cached.normalized.length) {
                    const cachedNormalized = markRaw(cached.normalized);
                    this.scheduleIdle(() => this.setSubjectsIfChanged(cachedNormalized));
                } else {
                    this.scheduleIdle(() => {
                        const normalized = this.normalizeSubjects(this.rawSubjects || []);
                        this.setSubjectsIfChanged(normalized);
                        writeCache({ ts: Date.now(), raw: this.rawSubjects || [], normalized });
                    });
                }
                return;
            }
            const subjectsUri = 'https://repetitor.ru/site/subject';
            fetch(subjectsUri)
                .then(response => response.json())
                .then(data => {
                    const raw = this.buildRawSubjects(data);
                    this.rawSubjects = raw;
                    this.setSubjectsIfChanged(raw);
                    this.scheduleIdle(() => {
                        const normalized = this.normalizeSubjects(raw);
                        this.setSubjectsIfChanged(normalized);
                        writeCache({ ts: Date.now(), raw, normalized });
                    });
                });
        }
    },
    mounted() {
        this.loadSubjects();
    }


})
</script>

<style scoped>
.wizard-selector {
    width: 100%;
    --vs-font-size: 20px;
    --vs-padding: 0.5rem 0.54rem;
    --vs-border: 1px solid #c4c4c6;
}
.wizard-selector__placeholder {
    width: 100%;
    min-height: 2.75rem;
    border: 1px solid #c4c4c6;
    border-radius: 4px;
    padding: 0.5rem 0.54rem;
    background: #ffffff;
    text-align: left;
    font-size: 20px;
    color: #777777;
}


</style>
