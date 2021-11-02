<template>
  <div>
    <div>

      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>

        <button @click="addLocationMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
        :zoom="14"
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

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    props:{
      latitude: String,
      longitude: String
    },

    addLocationMarker() {
      //this.existingPlace = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      console.log(this.existingPlace);
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

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.arrowCounter = -1;
      this.isOpen = false;
    },

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
