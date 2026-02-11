<template>
  <div class="city-selector" @mouseenter="loadCities" @click="loadCities" @focusin="loadCities">
    <VueSelect v-model="selectedCity" :options="cities" @option-selected="onSelectCity" @open="loadCities"
      @focus="loadCities" :isClearable="false" placeholder="Выберите город">
      <template #no-options>
        Не найдено
      </template>
      <template #option="{ option }">
        <div>
          <div>{{ option.label }}</div>
          <div style="color: gray;font-size: 12px;">и {{ option.region }}</div>
        </div>
      </template>
    </VueSelect>
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue';

const VueSelect = defineAsyncComponent(() => import("vue3-select-component"));
export default defineComponent({
  props:
  {
    'initialCity': Number,
    'initialCityLabel': String,
  },
  name: 'SelectCity',
  components: { VueSelect },
  data() {
    return {
      selectedCity: null,
      cities: [],
      citiesLoading: false,
      citiesLoaded: false
    }
  },
  computed: {

  },
  methods: {
    onSelectCity(option) {
      window.location = '/' + option.code

    },
    getCachedCities() {
      try {
        const cached = sessionStorage.getItem('select_cities_v1');
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        if (!parsed?.ts || !Array.isArray(parsed?.data)) return null;
        if (Date.now() - parsed.ts > 24 * 60 * 60 * 1000) return null;
        return parsed.data;
      } catch (e) {
        return null;
      }
    },
    setCachedCities(data) {
      try {
        sessionStorage.setItem('select_cities_v1', JSON.stringify({ ts: Date.now(), data }));
      } catch (e) {
        // ignore cache write errors
      }
    },
    loadCities() {
      if (this.citiesLoading || this.citiesLoaded) return;
      this.citiesLoading = true;

      const cached = this.getCachedCities();
      if (cached) {
        this.cities = cached;
        this.citiesLoaded = true;
        this.citiesLoading = false;
        return;
      }

      const citiesUri = '/site/region';
      fetch(citiesUri).then(response => response.json())
        .then(data => {
          const res = data.map((e) => ({ 'label': e.title, "value": e.id, "code": e.code, "id": e.id, "region": e.region }));
          this.cities = res.sort((a, b) => a.label.localeCompare(b.label, 'ru'));
          if (this.initialCity != null) {
            const match = this.cities.find(c => c.value === this.initialCity);
            if (!match && this.initialCityLabel) {
              this.cities.unshift({
                label: this.initialCityLabel,
                value: this.initialCity,
                code: null,
                id: this.initialCity,
                region: ''
              });
            }
            this.selectedCity = this.initialCity;
          }
          this.setCachedCities(this.cities);
        })
        .finally(() => {
          this.citiesLoaded = true;
          this.citiesLoading = false;
        });
    }
  },
  mounted() {
    this.selectedCity = this.initialCity;
    if (this.initialCityLabel && this.initialCity != null) {
      this.cities = [{
        label: this.initialCityLabel,
        value: this.initialCity,
        code: null,
        id: this.initialCity,
        region: ''
      }];
    }
    const cached = this.getCachedCities();
    if (cached) {
      this.cities = cached;
      this.citiesLoaded = true;
    }
  }

})
</script>

<style scoped>
.city-selector {
  min-width: 200px;
  --vs-border: 0px solid #ffffff;
  --vs-input-placeholder-color:#aaa

}

:deep(.control) {
  border: 5px;
}

.online-row {
  display: flex;
}

.accept-filter {
  color: #fff;
  text-decoration: none;
  background-color: #33ce97;
  border-color: #33ce97;
  margin-top: 24px;
  width: 100%;
  position: absolute;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #15b079;
  border-radius: 4px;
  font-weight: 600;
  line-height: 1.3;
  font-size: 15px;
  text-transform: uppercase;
  text-align: center;
}
</style>
