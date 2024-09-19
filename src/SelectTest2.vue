<template>
  <div class="city-selector">
    <VueSelect v-model="selectedCity" :options="[

      { label: 'repetitors', value: 'repetitors', },
      { label: 'peterburg', value: 'peterburg', },
      { label: 'novosibirsk', value: 'novosibirsk', },
      { label: 'ekaterinburg', value: 'ekaterinburg', },
      { label: 'kazan', value: 'kazan', code: 'kazan', },
      { label: 'nizhnii-novgorod', value: 'nizhnii-novgorod', },
      { label: 'samara', value: 'samara', },
      { label: 'chelyabinsk', value: 'chelyabinsk', },
      { label: 'omsk', value: 'omsk', },
      { label: 'rostov-na-donu', value: 'rostov-na-donu', },
      { label: 'ufa', value: 'ufa', }
    ]" @option-selected="onSelectCity" :isClearable="false" placeholder="Выберите город">
    </VueSelect>
    <input ref="search" type="text" v-model="inputvalue"> f
    {{ this.inputvalue }}b
    {{ searchval }}
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
const search = ref("");
import VueSelect from "vue3-select-component";
export default defineComponent({
  props:
  {
    'initialCity': Number,
  },
  name: 'SelectTest2',
  components: { VueSelect },
  data() {
    return {
      inputvalue: '',
      selectedCity: null,
      cities: [

        { label: 'repetitors', value: 'repetitors', code: 'repetitors', id: 1, region: 'Московская область' },
        { label: 'peterburg', value: 'peterburg', code: 'peterburg', id: 2, region: 'Ленинградская область ' },
        { label: 'novosibirsk', value: 'novosibirsk', code: 'novosibirsk', id: 3, region: 'Новосибирская область' },
        { label: 'ekaterinburg', value: 'ekaterinburg', code: 'ekaterinburg', id: 4, region: 'Свердловская область' },
        { label: 'kazan', value: 'kazan', code: 'kazan', id: 5, region: 'республика Татарстан' },
        { label: 'nizhnii-novgorod', value: 'nizhnii-novgorod', code: 'nizhnii-novgorod', id: 6, region: 'Нижегородская область' },
        { label: 'samara', value: 'samara', code: 'samara', id: 7, region: 'Самарская область' },
        { label: 'chelyabinsk', value: 'chelyabinsk', code: 'chelyabinsk', id: 8, region: 'Челябинская область' },
        { label: 'omsk', value: 'omsk', code: 'omsk', id: 9, region: 'Омская область' },
        { label: 'rostov-na-donu', value: 'rostov-na-donu', code: 'rostov-na-donu', id: 10, region: 'Ростовская область' },
        { label: 'ufa', value: 'ufa', code: 'ufa', id: 11, region: 'республика Башкортостан' }
      ], filteredCities: []
    }
  },
  computed: {
    searchval() {
      return search.value;
    }
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
