<template>
  <div class="city-selector">
    <VueSelect v-model="selectedCity"  :options="[

{ label: 'Москва', value: 'repetitors', code: 'repetitors', id: 1, region: 'Московская область' },
{ label: 'Санкт-Петербург', value: 'peterburg', code: 'peterburg', id: 2, region: 'Ленинградская область ' },
{ label: 'Новосибирск', value: 'novosibirsk', code: 'novosibirsk', id: 3, region: 'Новосибирская область' },
{ label: 'Екатеринбург', value: 'ekaterinburg', code: 'ekaterinburg', id: 4, region: 'Свердловская область' },
{ label: 'Казань', value: 'kazan', code: 'kazan', id: 5, region: 'республика Татарстан' },
{ label: 'Нижний Новгород', value: 'nizhnii-novgorod', code: 'nizhnii-novgorod', id: 6, region: 'Нижегородская область' },
{ label: 'Самара', value: 'samara', code: 'samara', id: 7, region: 'Самарская область' },
{ label: 'Челябинск', value: 'chelyabinsk', code: 'chelyabinsk', id: 8, region: 'Челябинская область' },
{ label: 'Омск', value: 'omsk', code: 'omsk', id: 9, region: 'Омская область' },
{ label: 'Ростов-на-Дону', value: 'rostov-na-donu', code: 'rostov-na-donu', id: 10, region: 'Ростовская область' },
{ label: 'Уфа', value: 'ufa', code: 'ufa', id: 11, region: 'республика Башкортостан' }
]"
      @option-selected="onSelectCity" :isClearable="false" placeholder="Выберите город">
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
  name: 'SelectTest',
  components: { VueSelect },
  data() {
    return {
      selectedCity: null,
      cities: [

        { label: 'Москва', value: 'repetitors', code: 'repetitors', id: 1, region: 'Московская область' },
        { label: 'Санкт-Петербург', value: 'peterburg', code: 'peterburg', id: 2, region: 'Ленинградская область ' },
        { label: 'Новосибирск', value: 'novosibirsk', code: 'novosibirsk', id: 3, region: 'Новосибирская область' },
        { label: 'Екатеринбург', value: 'ekaterinburg', code: 'ekaterinburg', id: 4, region: 'Свердловская область' },
        { label: 'Казань', value: 'kazan', code: 'kazan', id: 5, region: 'республика Татарстан' },
        { label: 'Нижний Новгород', value: 'nizhnii-novgorod', code: 'nizhnii-novgorod', id: 6, region: 'Нижегородская область' },
        { label: 'Самара', value: 'samara', code: 'samara', id: 7, region: 'Самарская область' },
        { label: 'Челябинск', value: 'chelyabinsk', code: 'chelyabinsk', id: 8, region: 'Челябинская область' },
        { label: 'Омск', value: 'omsk', code: 'omsk', id: 9, region: 'Омская область' },
        { label: 'Ростов-на-Дону', value: 'rostov-na-donu', code: 'rostov-na-donu', id: 10, region: 'Ростовская область' },
        { label: 'Уфа', value: 'ufa', code: 'ufa', id: 11, region: 'республика Башкортостан' }
      ], filteredCities: []
    }
  },
  computed: {

  },
  methods: {
    onSelectCity(option) {
      let location = window.location.pathname
      let arr = location.split('/')
      arr[1] = option.code
      let newPath = arr.join('/')
      window.location = newPath

    },
    onFilter(value) {
      alert(value)
      this.filteredCities = this.cities.filter((element) => { return element.label.toLowerCase().includes(value.toLowerCase()) })
    }
  },
  mounted() {
    this.filteredCities = this.cities;
    //     const citiesUri = 'https://repetitor.ru/site/region'

    //     fetch(citiesUri).then(response => response.json())
    //       .then(data => {
    //         let res = data.map((e) => ({ 'label': e.title, "value": e.code, "code": e.code, "id": e.id, "region": e.region }));
    //         console.log(res)
    //         this.cities = res.sort((a, b) => a.label - b.label);
    //       });
    //     let location = window.location.pathname.split('/');
    // console.log(this.cities)
    //     // let arr = location.split('/')
    //     if (location.length > 1) {

    //       let initCity = location[1]
    //       if (initCity == '') {
    //         this.selectedCity = 'repetitors'
    //       } else {
    //         this.selectedCity = initCity;
    //       }

    //     } else {
    //       this.selectedCity = 'repetitors'
    //     }

    // console.log(this.cities)
  }

})
</script>

<style scoped>
.city-selector {
  min-width: 200px;
  --vs-border: 0px solid #ffffff;
  --vs-input-placeholder-color: #aaa
}

/* @property --vs-border {
  syntax: "<color>";
  inherits: false;
  initial-value: white;

}

@property --vs-input-placeholder-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #aaa;

} */

/* :root {
  --vs-border: 0px solid #e4e4e7
} */

;

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
