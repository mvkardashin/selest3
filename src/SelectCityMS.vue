<template>
  <div class="city-selector">
    <VueMultiselect v-model="selectedCity" :option-height="104" :options="cities" track-by="label" label="label">
      <template #singleLabel="props">
        <div>
          <div>
            {{ props.option.label }}
          </div>
          <div>
            {{ props.option.region }}
          </div>
        </div>
        </template>
        <template #option="props">
        <div>
          <div>
            {{ props.option.label }}
          </div>
          <div>
            {{ props.option.region }}
          </div>
        </div>
        </template>
    </VueMultiselect>
    <p>{{ selectedCity }}</p>
    <p>{{ cities }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import VueMultiselect from 'vue-multiselect'

export default defineComponent({
  props:
  {
    'initialCity': Number,
  },
  name: 'SelectCityMS',
  components: { VueMultiselect },
  data() {
    return {
      selectedCity: null,
      cities: [ { "label": "Москва", "value": "repetitors", "code": "repetitors", "id": 1, "region": "Московская область" }, { "label": "Санкт-Петербург", "value": "peterburg", "code": "peterburg", "id": 2, "region": "Ленинградская область " }, { "label": "Новосибирск", "value": "novosibirsk", "code": "novosibirsk", "id": 3, "region": "‎Новосибирская область" }, { "label": "Екатеринбург", "value": "ekaterinburg", "code": "ekaterinburg", "id": 4, "region": "Свердловская область" }, { "label": "Казань", "value": "kazan", "code": "kazan", "id": 5, "region": "республика Татарстан" }, { "label": "Нижний Новгород", "value": "nizhnii-novgorod", "code": "nizhnii-novgorod", "id": 6, "region": "Нижегородская область" }, { "label": "Самара", "value": "samara", "code": "samara", "id": 7, "region": "Самарская область" }, { "label": "Челябинск", "value": "chelyabinsk", "code": "chelyabinsk", "id": 8, "region": "Челябинская область" }, { "label": "Омск", "value": "omsk", "code": "omsk", "id": 9, "region": "‎Омская область" }, { "label": "Ростов-на-Дону", "value": "rostov-na-donu", "code": "rostov-na-donu", "id": 10, "region": "Ростовская область" }, { "label": "Уфа", "value": "ufa", "code": "ufa", "id": 11, "region": "республика Башкортостан" }, { "label": "Красноярск", "value": "krasnoyarsk", "code": "krasnoyarsk", "id": 12, "region": "‎Красноярский край" }, { "label": "Воронеж", "value": "voronezh", "code": "voronezh", "id": 13, "region": "‎Воронежская область" }, { "label": "Пермь", "value": "perm", "code": "perm", "id": 14, "region": "Пермский край" }, { "label": "Волгоград", "value": "volgograd", "code": "volgograd", "id": 15, "region": "‎Волгоградская область" }, { "label": "Краснодар", "value": "krasnodar", "code": "krasnodar", "id": 16, "region": "Краснодарский край" }, { "label": "Абакан", "value": "abakan", "code": "abakan", "id": 17, "region": "Республика Хакасия" }, { "label": "Анадырь", "value": "anadyr", "code": "anadyr", "id": 18, "region": "Чукотский АО" }, { "label": "Архангельск", "value": "arhangelsk", "code": "arhangelsk", "id": 19, "region": "Архангельская область" }, { "label": "Астрахань", "value": "astrahan", "code": "astrahan", "id": 20, "region": "Астраханская область" }, { "label": "Барнаул", "value": "barnaul", "code": "barnaul", "id": 21, "region": "Алтайский край" }, { "label": "Белгород", "value": "belgorod", "code": "belgorod", "id": 22, "region": "Белгородская область" }, { "label": "Биробиджан", "value": "birobidzhan", "code": "birobidzhan", "id": 23, "region": "Еврейская АО" }, { "label": "Благовещенск", "value": "blagoveshchensk", "code": "blagoveshchensk", "id": 24, "region": "Амурская область" }, { "label": "Брянск", "value": "bryansk", "code": "bryansk", "id": 25, "region": "Брянская область" }, { "label": "Великий Новгород", "value": "velikij-novgorod", "code": "velikij-novgorod", "id": 26, "region": "Новгородская область" }, { "label": "Владивосток", "value": "vladivostok", "code": "vladivostok", "id": 27, "region": "Приморский край" }, { "label": "Владикавказ", "value": "vladikavkaz", "code": "vladikavkaz", "id": 28, "region": "р. Северная Осетия" }, { "label": "Владимир", "value": "vladimir", "code": "vladimir", "id": 29, "region": "Владимирская область" }, { "label": "Вологда", "value": "vologda", "code": "vologda", "id": 30, "region": "Вологодская область" }, { "label": "Горно-Алтайск", "value": "gorno-altajsk", "code": "gorno-altajsk", "id": 31, "region": "р. Алтай" }, { "label": "Грозный", "value": "groznyj", "code": "groznyj", "id": 32, "region": "Чеченская Республика" }, { "label": "Иваново", "value": "ivanovo", "code": "ivanovo", "id": 33, "region": "Ивановская область" }, { "label": "Ижевск", "value": "izhevsk", "code": "izhevsk", "id": 34, "region": "Удмуртская Республика" }, { "label": "Иркутск", "value": "irkutsk", "code": "irkutsk", "id": 35, "region": "Иркутская область" }, { "label": "Йошкар-Ола", "value": "joshkar-ola", "code": "joshkar-ola", "id": 36, "region": "р. Марий-Эл" }, { "label": "Калининград", "value": "kaliningrad", "code": "kaliningrad", "id": 37, "region": "Калининградская область" }, { "label": "Калуга", "value": "kaluga", "code": "kaluga", "id": 38, "region": "Калужская область" }, { "label": "Кемерово", "value": "kemerovo", "code": "kemerovo", "id": 39, "region": "Кемеровская область" }, { "label": "Киров", "value": "kirov", "code": "kirov", "id": 40, "region": "Кировская область" }, { "label": "Кострома", "value": "kostroma", "code": "kostroma", "id": 41, "region": "Костромская область" }, { "label": "Курган", "value": "kurgan", "code": "kurgan", "id": 42, "region": "Курганская область" }, { "label": "Курск", "value": "kursk", "code": "kursk", "id": 43, "region": "Курская область" }, { "label": "Кызыл", "value": "kyzyl", "code": "kyzyl", "id": 44, "region": "р. Тыва" }, { "label": "Липецк", "value": "lipeck", "code": "lipeck", "id": 45, "region": "Липецкая область" }, { "label": "Магадан", "value": "magadan", "code": "magadan", "id": 46, "region": "Магаданская область" }, { "label": "Магас", "value": "magas", "code": "magas", "id": 47, "region": "р. Ингушетия" }, { "label": "Майкоп", "value": "majkop", "code": "majkop", "id": 48, "region": "р. Адыгея" }, { "label": "Махачкала", "value": "mahachkala", "code": "mahachkala", "id": 49, "region": "р. Дагестан" }, { "label": "Мурманск", "value": "murmansk", "code": "murmansk", "id": 50, "region": "Мурманская область" }, { "label": "Нальчик", "value": "nalchik", "code": "nalchik", "id": 51, "region": "Кабардино-Балкарская Республика" }, { "label": "Нарьян-Мар", "value": "naryan-mar", "code": "naryan-mar", "id": 52, "region": "Ненецкий АО" }, { "label": "Орёл", "value": "oryol", "code": "oryol", "id": 53, "region": "Орловская область" }, { "label": "Оренбург", "value": "orenburg", "code": "orenburg", "id": 54, "region": "Оренбургская область" }, { "label": "Пенза", "value": "penza", "code": "penza", "id": 55, "region": "Пензенская область" }, { "label": "Петрозаводск", "value": "petrozavodsk", "code": "petrozavodsk", "id": 56, "region": "р. Карелия" }, { "label": "Петропавловск-Камчатский", "value": "petropavlovsk-kamchatskij", "code": "petropavlovsk-kamchatskij", "id": 57, "region": "Камчатский край" }, { "label": "Псков", "value": "pskov", "code": "pskov", "id": 58, "region": "Псковская область" }, { "label": "Рязань", "value": "ryazan", "code": "ryazan", "id": 59, "region": "Рязанская область" }, { "label": "Салехард", "value": "salekhard", "code": "salekhard", "id": 60, "region": "Ямало-Ненецкий " }, { "label": "Саранск", "value": "saransk", "code": "saransk", "id": 61, "region": "р. Мордовия" }, { "label": "Саратов", "value": "saratov", "code": "saratov", "id": 62, "region": "Саратовская область" }, { "label": "Симферополь", "value": "simferopol", "code": "simferopol", "id": 64, "region": "р. Крым" }, { "label": "Смоленск", "value": "smolensk", "code": "smolensk", "id": 65, "region": "Смоленская область" }, { "label": "Ставрополь", "value": "stavropol", "code": "stavropol", "id": 66, "region": "Ставропольский край" }, { "label": "Сыктывкар", "value": "syktyvkar", "code": "syktyvkar", "id": 67, "region": "р. Коми" }, { "label": "Тамбов", "value": "tambov", "code": "tambov", "id": 68, "region": "Тамбовская область" }, { "label": "Тверь", "value": "tver", "code": "tver", "id": 69, "region": "Тверская область" }, { "label": "Томск", "value": "tomsk", "code": "tomsk", "id": 70, "region": "Томская область" }, { "label": "Тула", "value": "tula", "code": "tula", "id": 71, "region": "Тульская область" }, { "label": "Тюмень", "value": "tyumen", "code": "tyumen", "id": 72, "region": "Тюменская область" }, { "label": "Улан-Удэ", "value": "ulan-ude", "code": "ulan-ude", "id": 73, "region": "р. Бурятия" }, { "label": "Ульяновск", "value": "ulyanovsk", "code": "ulyanovsk", "id": 74, "region": "Ульяновская область" }, { "label": "Хабаровск", "value": "habarovsk", "code": "habarovsk", "id": 75, "region": "Хабаровский край" }, { "label": "Ханты-Мансийск", "value": "hanty-mansijsk", "code": "hanty-mansijsk", "id": 76, "region": "Ханты-Мансийский АО" }, { "label": "Чебоксары", "value": "cheboksary", "code": "cheboksary", "id": 77, "region": "Чувашская Республика" }, { "label": "Черкесск", "value": "cherkessk", "code": "cherkessk", "id": 78, "region": "Карачаево-Черкесская Республика" }, { "label": "Чита", "value": "chita", "code": "chita", "id": 79, "region": "Забайкальский край" }, { "label": "Элиста", "value": "elista", "code": "elista", "id": 80, "region": "р. Калмыкия" }, { "label": "Южно-Сахалинск", "value": "yuzhno-sahalinsk", "code": "yuzhno-sahalinsk", "id": 81, "region": "Сахалинская область" }, { "label": "Якутск", "value": "yakutsk", "code": "yakutsk", "id": 82, "region": "р. Саха(Якутия)" }, { "label": "Ярославль", "value": "yaroslavl", "code": "yaroslavl", "id": 83, "region": "Ярославская область" }]
    }
  },
  computed: {

  },
  methods: {


    nameWithRegion({ label, region }) {
      return `${label} — [${region}]`
    },
    onSelectCity(option) {
      let location = window.location.pathname
      let arr = location.split('/')
      arr[1] = option.code
      let newPath = arr.join('/')
      window.location = newPath

    },
  },
  mounted() {
    const citiesUri = 'https://repetitor.ru/site/region'

    fetch(citiesUri).then(response => response.json())
      .then(data => {
        let res = data.map((e) => ({ 'label': e.title, "value": e.code, "code": e.code, "id": e.id, "region": e.region }));
        this.cities = res.sort((a, b) => a.label - b.label);
      });
    let location = window.location.pathname.split('/');

    // let arr = location.split('/')
    if (location.length > 1) {

      let initCity = location[1]
      if (initCity == '') {
        this.selectedCity = 'repetitors'
      } else {
        this.selectedCity = initCity;
      }

    } else {
      this.selectedCity = 'repetitors'
    }


  }

})
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.city-selector {
  min-width: 200px;
}

@property --vs-border {
  syntax: "<color>";
  inherits: false;
  initial-value: white;

}

@property --vs-input-placeholder-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #aaa;

}

:root {
  --vs-border: 0px solid #e4e4e7
}

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
