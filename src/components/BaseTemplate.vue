<template>
  <div class="flex flex-row">
    <div class="w-1/2 font-mono text-sm">
      <VueTribute :options="vueTributeOptions">
        <textarea
          autofocus
          class="
            w-full
            h-100vh
            resize-none
            outline-none
            bg-blue/10
            p-4
            overflow-y-scroll
          "
          v-model="store.entry"
        ></textarea>
      </VueTribute>
    </div>
    <div class="w-1/2 font-serif text-sm">
      <div class="p-4 w-full h-100vh overflow-y-scroll">
        <!-- <pre>{{ indexObj ? Object.entries(indexObj).sort() : "" }}</pre> -->
        <ul>
          <TreeView
            v-for="(node, index) in indexObj && Object.entries(indexObj).sort()"
            :key="index"
            :node="node"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TreeView from "./TreeView.vue";
import { VueTribute } from "vue-tribute";
import { useLocalStorage } from "@vueuse/core";
export default {
  name: "BaseTemplate",
  components: { TreeView, VueTribute },
  setup() {
    const store = useLocalStorage("entryStore", {
      entry: "",
    });
    return { store };
  },
  data() {
    return {
      vueTributeOptions: {
        values: (text, cb) => cb(this.getAutocompleteOptions(text)),
        allowSpaces: true,
        autocompleteMode: false,
        noMatchTemplate: function () {
          return '<span style:"visibility: hidden;"></span>';
        },
        fillAttr: "key",
        searchOpts: {
          pre: "<b>",
          post: "</b>",
        },
        selectTemplate: function (item, etc) {
          return item?.original?.key || "";
        },
        replaceTextSuffix: ", ",
      },
    };
  },
  computed: {
    entryLines() {
      if (!this.store.entry) return [];
      return this.store.entry
        .replace(/\n^$/gm, "")
        .split("\n")
        .filter((line) => !/^ *@/.test(line));
    },
    uniqueEntryLinesSansPages() {
      return [
        ...new Set(
          this.entryLines.map((line) => line.replace(/, *[\d-]* *$/, ""))
        ),
      ];
    },
    indexObj() {
      if (!this.entryLines) return;
      return this.entryLines.reduce((obj, line) => {
        let fields = line.split(",");
        let subObj = obj;
        fields.forEach((concept) => {
          concept = concept.trim();
          if (!subObj[concept]) subObj[concept] = {};
          subObj = subObj[concept];
        });
        return obj;
      }, {});
    },
  },
  methods: {
    getAutocompleteOptions(text) {
      return this.uniqueEntryLinesSansPages.map((line) => ({
        key: line,
      }));
    },
  },
};
</script>



<style lang="scss">
.tribute-container {
  @apply ring-1 ring-black text-sm bg-blue/20 rounded m-4 important:left-0 select-none shadow-lg shadow-black/20;
  li {
    @apply py-1 px-2;
    &.highlight {
      @apply bg-blue text-white;
    }
  }
}
</style>

