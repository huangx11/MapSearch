import Vue from 'vue'
import App from './App.vue'
import './assets/index.css'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import CustomGoogleAutocomplete from 'vue-custom-google-autocomplete'

import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false
Vue.use(Autocomplete)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAW-wOGBvpTNrxbYSWkLdnabFcYSx6G_LU",
    libraries: "places",
    country: "US",
  }
});

new Vue({
  render: h => h(App),

}).$mount('#app')

Vue.use(CustomGoogleAutocomplete)
