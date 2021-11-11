import Vue from 'vue'
import App from './App.vue'
import './assets/index.css'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import CustomGoogleAutocomplete from 'vue-custom-google-autocomplete'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false
Vue.use(Autocomplete)

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/'
})

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAW-wOGBvpTNrxbYSWkLdnabFcYSx6G_LU",
    libraries: "places",
    country: "US",
  }
});

new Vue({

  render: h => h(App),
  apolloProvider


}).$mount('#app')

Vue.use(CustomGoogleAutocomplete)
