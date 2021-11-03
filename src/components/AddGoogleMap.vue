<template>
  <div>
    <div>
      <p>This is a google provide autocomplete search bar</p>
      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>

        <button @click="addLocationMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
        :zoom="5"
        :center="center"
        style="width:100%;  height: 600px;"
    >
      <gmap-marker
          :key="index"
          v-for="(m, index) in locationMarkers"
          :position="m.position"
          @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>

import SearchAutocomplete from "@/components/SearchAutocomplete";
//import * as google from "vue2-google-maps"
//import { eventBus } from '@/event-bus.js';

export default {
  name: "AddGoogleMap",

  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      map:{}
    };
  },

  /*
  // receive state data from SearchAutocomplete
  mounted: function() {
    eventBus.$on('sendStateData', (payload) => {
      this.renderStateMap(payload);
    })
  },

   */

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
      console.log(loc);
    },

    addLocationMarker() {
      console.log(SearchAutocomplete.existingPlace);
      if (this.existingPlace) {
        const marker = {

          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        console.log(this.existingPlace);
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }

    },
    /*
    renderStateMap(myStateData) {
      myStateData.setMap(this.map);

      // and pass clicks on to the underlying map
      myStateData.addListener('click', (event) => {
        google.maps.event.trigger(this.map, 'click', event);
      });
    },

     */

    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    },

  }
};

</script>
