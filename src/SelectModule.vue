<template>

  <div class="filter__group">
    <p class="filter__type top_margin">Предмет</p>
    <div class="filter__item custom_select">
      <VueSelect v-model="selectedSubject" :options="subjects" @option-selected="onSelectSubject"
        @option-deselected="onDeselectSubject" :isClearable="false" placeholder="Выберите предмет">
        <template #no-options>
          Не найдено
        </template>
      </VueSelect>
    </div>
    <p class="filter__type top_margin">Категория</p>
    <div class="filter__item custom_select">
      <VueSelect v-model="selectedCategory" :options="filteredCategories" :isDisabled="isCategoryEmpty"
        :placeholder="isCategoryEmptyText">
        <template #no-options>
          Не найдено
        </template>
      </VueSelect>
    </div>
    <p class="filter__type top_margin">Место занятий</p>

    <div class="online_row filter__type">
      <p style="margin: 0px; ">Онлайн</p>
      <input style="margin-top: auto ;margin-bottom: auto;margin-left: 10px;" type="checkbox" v-model="isOnline"
        @input="onClickOnline">
    </div>
    <div class="filter__item custom_select">
      <VueSelect v-model="selectedGeo" :options="geo" :placeholder="geoPlaceholder" :isDisabled="isGeoDisabled">
        <template #no-options>
          Не найдено
        </template>
        <template #option="{ option }">
          <div>
            <div>{{ isMetro(option) }}{{ isCity(option) }}{{ isDistrict(option) }}{{ option.label }}</div>
            <div style="color: gray;font-size: 12px;">{{ metroLine(option) }}</div>
          </div>
        </template>
      </VueSelect>
    </div>
    <p class="filter__type top_margin">Для кого</p>
    <div class="filter__item custom_select">
      <VueSelect v-model="selectedAge" :options="ages" placeholder="Не выбрано">
        <template #no-options>
          Не найдено
        </template>
      </VueSelect>
    </div>
    <p class="filter__type top_margin">Цена</p>
    <div class="filter__item custom_select">
      <VueSelect v-model="selectedPrice" :options="prices" placeholder="Не выбрано">
        <template #no-options>
          Не найдено
        </template>
      </VueSelect>
    </div>
    <a class="filter__button button button--transparent" :href="`${fullUri}`">Применить фильтр</a>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import VueSelect from "vue3-select-component";// eslint-disable-next-line
export default defineComponent({
  props:
  {
    'city': Number,
    'cityCode': Number,
    'initialGeoType': String,
    'initialGeoId': Number,
    'initialSubject': Number,
    'initialCategory': Number,
    'initialOnline': Boolean,
    'initialPrice': String,
    'initialAge': Number,

  },
  name: 'SelectModule',
  components: { VueSelect },
  data() {
    return {
      allsubjects: [],
      subjects: [],
      filteredCategories: [],
      allgeo: [],
      geo: [],
      ages: [
        { 'label': 'Дошкольники', 'value': 'age=1' },
        { 'label': 'Школьники 1-4 класс', 'value': 'age=2' },
        { 'label': 'Школьники 5-9 класс', 'value': 'age=3' },
        { 'label': 'Школьники 10-11 класс', 'value': 'age=4' },
        { 'label': 'Студенты университетов', 'value': 'age=5' },
        { 'label': 'Взрослые', 'value': 'age=6' }
      ],
      prices: [
        { 'label': 'До 800 р.', 'value': 'min=0&max=800' },
        { 'label': '800 - 1500 р.', 'value': 'min=800&max=1500' },
        { 'label': '1300 - 2500 р.', 'value': 'min=1300&max=2500' },
        { 'label': '2500 - 4000 р.', 'value': 'min=2500&max=4000' }],
      selectedGeo: null,
      selectedSubject: null,
      selectedCategory: null,
      selectedAge: null,
      selectedPrice: null,
      isOnline: null
    }
  },
  computed: {
    isCategoryEmpty() {
      return this.filteredCategories.length == 0;
    },


    isCategoryEmptyText() {
      return this.filteredCategories.length == 0 ? 'Нет категорий предмета' : 'Не выбрано';
    },
    isGeoDisabled() {
      return this.isOnline == true;
    },
    geoPlaceholder() {
      return this.isOnline ? "Недоступно онлайн" : "Не выбрано"
    },
    selectedSubjectCode() {
      return this.selectedSubject != null ? "/" + this.subjects.find((subject) => { return subject.value == this.selectedSubject }).code : ''
    },
    selectedCategoryCode() {
      return this.selectedCategory != null && this.selectedCategory != 0 ? "/" + this.filteredCategories.find((subject) => { return subject.value == this.selectedCategory }).code : ''
    },
    selectedGeoCode() {
      return this.selectedGeo != null ? '/' + this.selectedGeo : ''
    },
    selectedOnlineCode() {
      return this.isOnline != null && this.isOnline==true ? '/online'  : ''
    },

    fullUri() {
      return '/' + (this.cityCode != null ? this.cityCode : '') + this.selectedSubjectCode + this.selectedCategoryCode + this.selectedGeoCode +this.selectedOnlineCode + this.queryPart;
    },
    queryPart() {
      let queries = [];
      // if (this.isOnline != null && this.isOnline == true) { queries.push("place=3") }
      // if (this.selectedGeo!=null) { queries.push(this.selectedGeo) }
      if (this.selectedAge != null) { queries.push(this.selectedAge) }
      if (this.selectedPrice != null) { queries.push(this.selectedPrice) }
      return queries.length != 0 ? "?" + queries.join("&") : ''
    }
  },
  methods: {
    onSelectSubject(option) {
      this.filteredCategories = this.allsubjects.filter((subject) => { return subject.parent_id == option.value });
      this.selectedCategory = null;
    },
    onDeselectSubject() {
      this.selectedCategory = null;
    },
    isMetro(option) {
      if (option.type == "metro") { return 'м. ' } else {
        return ''
      }
    },
    metroLine(option) {
      if (option.type == "metro" && option.line != null) { return option.line } else {
        return ''
      }
    },
    isCity(option) {
      if (option.type == "area" && option.is_town == 1) { return 'г. ' } else {
        return ''
      }
    },
    isDistrict(option) {
      if (option.type == "area" && option.is_district == 1) { return 'р-н. ' } else {
        return ''
      }
    },
    onClickOnline() {
      this.selectedGeo = null;
      this.isOnline = !this.isOnline;
    }
  },
  mounted() {
    const subjectsUri = '/site/subject';
    const geoUri = '/site/geo';
    fetch(subjectsUri).then(response => response.json())
      .then(data => {
        let res = data.map((e) => ({ 'label': e.title, "value": e.id, "code": e.code, "parent_id": e.parent_id }));

        this.allsubjects = res.sort((a, b) => a.label - b.label);
        this.subjects = this.allsubjects.filter((subject) => { return subject.parent_id == null }).sort((a, b) => a.label < b.label ? -1 : (a.label > b.label ? 1 : 0));
        if (this.initialSubject != null) {
          this.selectedSubject = this.initialSubject;
        }
        this.filteredCategories = this.allsubjects.filter((subject) => { return subject.parent_id == this.initialSubject });
        if (this.initialCategory != null) {
          this.selectedCategory = this.initialCategory;
        }
      });

    fetch(geoUri + '?id=' + this.city).then(response => response.json())
      .then(data => {
       
        let res = data.map((e) => ({ 'label': e.title, "type": e.type, "id": e.id, "value": e.type == 'area' ? 'a'+ "-" + e.code : 'm' + "-" + e.code, "city": e.location_id, 'line': e.line, 'is_town': e.is_town, 'is_district': e.is_district }));
        this.allgeo = res;
       
        this.geo = this.allgeo.sort((a, b) => a.label < b.label ? -1 : (a.label > b.label ? 1 : 0));
        if (this.initialGeoId != null && this.initialGeoType && !this.isOnline) {
          let initialGeoVal = this.geo.find((e) => e.type == this.initialGeoType && e.id==this.initialGeoId);
          this.selectedGeo=initialGeoVal.value;
         
        }
      });

    if (this.initialPrice != null && this.initialPrice != "min=&max=" && this.initialPrice != "min=0&max=0") {
      this.selectedPrice = this.initialPrice
    }
    if (this.initialAge != null && this.initialAge != 0) {
      this.selectedAge = "age=" + this.initialAge
    }
    if (this.initialOnline != null && this.initialOnline == true) {
      this.isOnline = true;
      this.selectedGeo = null;
    }
  }

})
</script>

<style scoped>
@property --vs-input-placeholder-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #aaa;

}

.top_margin {
  margin-top: 20px;
}

.online_row {
  display: flex;
}

.accept_filter {
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
