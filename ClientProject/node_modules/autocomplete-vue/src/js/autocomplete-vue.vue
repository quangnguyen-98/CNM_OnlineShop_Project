<style lang="sass">
    .autocomplete {
        position: relative;

        input {
            width: 100%;
        }
    }

    .autocomplete__suggestions {
        position: absolute;
        top: 100%;
        background-color: #fff;
        width: 100%;
        z-index: 2;
    }

    .autocomplete__entry {
        &:hover {
            background-color: #f7f7f9;
            cursor: default;
        }
    }

    .autocomplete__selected {
        background-color: darken(#f7f7f9, 5%);
    }
</style>

<template>
    <div :class="classPrefix" @mousedown="mousefocus = true" @mouseout="mousefocus = false">
        <input type="text" @blur="focused = false" @focus="focused = true"
            v-model="search" :placeholder="placeholder" :class="inputClass"
            @keydown.down.prevent.stop="moveDown()"
            @keydown.up.prevent.stop="moveUp()"
            @keydown.enter.prevent.stop="select(selectedIndex)"
            @keydown.tab="mousefocus = false"
            :value="value"
            ref="input"
            :required="required">
        <div v-if="showSuggestions" :class="classPrefix + '__suggestions'">
            <div v-for="(entry, index) in filteredEntries"
                @click="select(index)"
                :class="[classPrefix + '__entry', selectedClass(index)]">
                {{ entry[property] }}
            </div>
        </div>
    </div>
</template>

<script>
import { autocompleteBus } from "./autocompleteBus.js";

export default {
  data() {
    return {
      entries: [],
      search: "",
      focused: false,
      mousefocus: false,
      selectedIndex: 0
    };
  },
  computed: {
    filteredEntries() {
      if (this.search.length <= this.threshold) {
        return [];
      } else {
        return this.entries.filter(entry => {
          if (this.ignoreCase) {
            return (
              entry[this.property]
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1
            );
          }
          return entry[this.property].indexOf(this.search) > -1;
        });
      }
    },
    hasSuggestions() {
      if (this.search.length <= this.threshold) {
        return false;
      }

      return this.filteredEntries.length > 0;
    },
    showSuggestions() {
      if (!this.hasSuggestions) {
        return false;
      }

      if (this.focused || this.mousefocus) {
        return true;
      }

      return false;
    }
  },
  created() {
    this.search = this.value;
    if (this.list !== undefined) {
      this.setEntries(this.list);
    } else if (this.url !== undefined && this.requestType !== undefined) {
      this.getListAjax();
    }
  },
  methods: {
    select(index) {
      if (this.hasSuggestions) {
        this.search = this.filteredEntries[index][this.property];
        autocompleteBus.$emit("autocomplete-select", this.search);
        this.$emit("selected", this.search);

        if (this.autoHide) {
          this.mousefocus = false;
          this.focused = false;
          this.$refs.input.blur();
        } else {
          this.$nextTick(() => {
            this.$refs.input.focus();
          });
        }
      }
    },
    setEntries(list) {
      this.entries = list;
    },
    moveUp() {
      if (this.selectedIndex - 1 < 0) {
        this.selectedIndex = this.filteredEntries.length - 1;
      } else {
        this.selectedIndex -= 1;
      }
    },
    moveDown() {
      if (this.selectedIndex + 1 > this.filteredEntries.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex += 1;
      }
    },
    selectedClass(index) {
      if (index === this.selectedIndex) {
        return this.classPrefix + "__selected";
      }

      return "";
    },
    getListAjax() {
      return this.$http[this.requestType](this.url).then(response => {
        this.setEntries(response.data);
      });
    }
  },
  props: {
    classPrefix: {
      type: String,
      required: false,
      default: "autocomplete"
    },
    url: {
      type: String,
      required: false
    },
    requestType: {
      type: String,
      required: false,
      default: "get"
    },
    list: {
      type: Array,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    property: {
      type: String,
      required: false,
      default: "name"
    },
    inputClass: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    ignoreCase: {
      type: Boolean,
      required: false,
      default: true
    },
    threshold: {
      type: Number,
      required: false,
      default: 0
    },
    value: {
      required: false,
      default: ""
    },
    autoHide: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    filteredEntries(value) {
      if (this.selectedIndex > value.length - 1) {
        this.selectedIndex = 0;
      }
    },
    search(value) {
      this.$emit("input", value);
    },
    value(newValue) {
      this.search = newValue;
    }
  }
};
</script>
