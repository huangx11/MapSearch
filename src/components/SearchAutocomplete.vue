<template>

  <div class="autocomplete">
    <h2>Vue Js Search and Add Marker</h2>
    <p>This is a typeahead suggestion search bar</p>
    <input
        v-model="search"
        @input="onChange"
        type="text"
    />

    <ul
        v-show="isOpen"
        class="autocomplete-results"
    >
      <li
          v-for="(result, i) in results"
          :key="i"
          @click="setResult(result)"
          class="autocomplete-result"
      >
        {{ result }}
      </li>
    </ul>
    <button @click="show">Add</button>

  </div>

</template>

<script>
/*
import { eventBus } from '@/event-bus.js';
import axios from 'axios';
import * as google from "vue2-google-maps"
import AddGoogleMap from "@/components/AddGoogleMap";
 */
import gql from 'graphql-tag'

export default {

  name: 'SearchAutocomplete',
  apollo: {
    states: gql`query {
      states(id: "Arizona") {
        state
        border
      }
    }`,
  },
  /*
  // using Query with parameters
  apollo: {
    states: gql`query($state: String!) {
      states(state: $state) {
        id
        state
        border
      }
    }`,
  },

   */
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
      address: Array,

    },
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      array: [
        this.results
      ]
    };
  },
  // add clickoutside event listener
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },

  methods: {
    setResult(result) {
      this.search = result;
      //console.log(this.results);
      this.isOpen = false;
    },
    filterResults() {
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    // when user press add button, it will send a get request to the backend and return the paths of state
    show() {
      // results[0] is a string user input
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      console.log("user input:" + this.results[0]);
      console.log("result from backend:" + this.states.state);
      console.log(this.states.border);

      //this.stateName = this.results[0];



    },

  },


}
</script>


<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  left: 100px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #eeeeee;
  height: 120px;
  min-height: 1em;
  max-height: 100em;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}
</style>