import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/scss/bootstrap-refresh.scss'
import './assets/scss/global.scss'
import MyButton from "./components/global/MyButton";
import MySwitcher from "./components/global/MySwitcher";
import MyCheckbox from "./components/global/MyCheckbox";
import SubmitButtons from "./components/global/SubmitButtons";
import MaskedInput from "vue-masked-input/src/MaskedInput";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

library.add(fas);
Vue.config.productionTip = false
Vue.component('masked-input', MaskedInput)
Vue.component('multiselect', Multiselect)
Vue.component('my-button', MyButton)
Vue.component('my-checkbox', MyCheckbox)
Vue.component('my-switcher', MySwitcher)
Vue.component('submit-buttons', SubmitButtons)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('date-picker', DatePicker);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.filter('number', s =>  {
  if(!window.Intl) return s;
  return new Intl.NumberFormat().format(s);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
