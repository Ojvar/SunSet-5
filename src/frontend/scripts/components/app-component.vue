<template lang="pug">
.section
  h1 Hello from App component
  h2 Hi {{ name }}
</template>

<script lang="ts">
  import { defineComponent, Ref, ref } from "vue";

  export default defineComponent({
    name: "AppComponent",

    /**
     * Setup
     */
    setup(porps, { emit }) {
      const name: Ref<string> = ref("MyName");

      return {
        name,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .section {
    background-color: blue;
    color: yellow;
  }
</style>
