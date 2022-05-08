<template>
  <li>
    <div>{{ name }}</div>
    <ul class="ms-8">
      <TreeView v-for="(node, index) in children" :key="index" :node="node" />
    </ul>
    <!-- {{ node }} -->
  </li>
</template>

<li></li>
<script>
export default {
  name: "TreeView",
  props: ["node"],
  computed: {
    name() {
      return this.node[0];
    },
    children() {
      return this.node[1] && Object.entries(this.node[1]).sort();
    },
  },
};
</script>