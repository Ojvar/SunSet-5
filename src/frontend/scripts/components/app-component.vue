<template lang="pug">
.section
  .field
    p.control.has-icons-left.has-icons-right
      input.input(type='email' placeholder='Email')
      span.icon.is-small.is-left
        i.fas.fa-envelope
      span.icon.is-small.is-right
        i.fas.fa-check
  .field
    p.control.has-icons-left
      input.input(type='password' placeholder='Password')
      span.icon.is-small.is-left
        i.fas.fa-lock
  .field
    p.control
      button.button.is-success
        | Login

</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "AppComponent",

  /**
   * Setup
   */
  setup(porps, { emit }) {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
