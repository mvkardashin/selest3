<template>
    <div class="search-subject">
        <div id="wizard-select" class="wizard-selector" :value="selectedSubject">
            <VueSelect v-model="selectedSubject" :options="subjects" @option-selected="onSelectSubject"
                placeholder="Выберите предмет">
                <template #no-options>
                    Не найдено
                </template>

            </VueSelect>

        </div>
        <a class="search-subject__btn button" :href="link">Найти</a>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

import VueSelect from "vue3-select-component";
export default defineComponent({
    name: 'SelectWizard',

    components: { VueSelect },
    data() {
        return {
            selectedSubject: 0,
            subjects: []
        }
    },
    computed: {
        link() {
            return "/wizard?id=" + this.selectedSubject;
        }
    },
    methods: {
        onSelectSubject(option) {
            window.location = "/wizard?id="+option.value;
        },
    },
    mounted() {
        const subjectsUri = '/site/subject';
        fetch(subjectsUri).then(response => response.json())
            .then(data => {
                let res = data.map((e) => ({ 'label': e.title, "value": e.id, "code": e.code, "parent_id": e.parent_id }));
                res.forEach(element => {
                    if (element.parent_id != null) {
                        let parentLabel = res.find((el, val, arr) => {
                            val;
                            arr;
                            return el.value == element.parent_id
                        }).label;
                        if (parentLabel != null) {
                            element.label = parentLabel + '. ' + element.label
                        }
                    }
                });
                this.subjects = res.sort((a, b) => a.label < b.label ? -1 : (a.label > b.label ? 1 : 0));
            });


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


</style>