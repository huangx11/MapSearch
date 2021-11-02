<template>

  <div class="autocomplete">
    <h2>Vue Js Search and Add Marker</h2>
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

export default {

  name: 'SearchAutocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      map:{}
    };
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
    show(){
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      console.log(this.existingPlace);
      console.log(this.results.geometry.location.lat());
      console.log(this.results[0]);
    },

  },
}
</script>

<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
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

.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}
</style>