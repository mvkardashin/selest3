// import { createApp } from 'vue'
import SelectModule from './SelectModule.vue'
import { defineCustomElement } from 'vue';
import SelectCity from './SelectCity.vue';
import SelectWizard from './SelectWizard.vue';
import SelectTest from './SelectTest.vue';
import SelectCityMS from './SelectCityMS.vue';
import SelectTest2 from './SelectTest2.vue';

// import VueSelect from 'vue3-select-component';

// app.component('v-select', VueSelect);

const CE1= defineCustomElement(SelectModule,{shadowRoot:false});
const CE2= defineCustomElement(SelectCity,{shadowRoot:false});
const CE3= defineCustomElement(SelectWizard,{shadowRoot:false});
const CE4= defineCustomElement(SelectTest,{shadowRoot:false});
const CE5= defineCustomElement(SelectCityMS,{shadowRoot:false});
const CE6= defineCustomElement(SelectTest2,{shadowRoot:false});
customElements.define('select-module', CE1);
customElements.define('select-city', CE2);
customElements.define('select-wizard', CE3);
customElements.define('select-test', CE4);
customElements.define('select-ms', CE5);
customElements.define('select-t', CE6);

