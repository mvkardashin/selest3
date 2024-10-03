<template>
  <div class="city-selector">
    <VueSelect v-model="selectedCity" :options="cities" @option-selected="onSelectCity" :isClearable="false"
      placeholder="Выберите город">
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
import { defineComponent } from 'vue';

import VueSelect from "vue3-select-component";
export default defineComponent({
  props:
  {
    'initialCity': Number,
  },
  name: 'SelectCity',
  components: { VueSelect },
  data() {
    return {
      selectedCity: null,
      cities: []
    }
  },
  computed: {

  },
  methods: {
    onSelectCity(option) {     
      window.location = '/'+option.code

    },
  },
  mounted() {
    const citiesUri = '/site/region'
    fetch(citiesUri).then(response => response.json())
      .then(data => {
        let res = data.map((e) => ({ 'label': e.title, "value": e.id, "code": e.code, "id": e.id, "region": e.region }));
        this.cities = res.sort((a, b) => a.label - b.label);
      });
    this.selectedCity=this.initialCity;
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
