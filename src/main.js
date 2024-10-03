// import { createApp } from 'vue'
import SelectModule from './SelectModule.vue'
import { defineCustomElement } from 'vue';
import SelectCity from './SelectCity.vue';
import SelectWizard from './SelectWizard.vue';


const CE1= defineCustomElement(SelectModule,{shadowRoot:false});
const CE2= defineCustomElement(SelectCity,{shadowRoot:false});
const CE3= defineCustomElement(SelectWizard,{shadowRoot:false});

customElements.define('select-module', CE1);
customElements.define('select-city', CE2);
customElements.define('select-wizard', CE3);


