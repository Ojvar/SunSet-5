<template lang="pug">
h1 Hello {{ title }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data: () => ({
        title: "World",
    }),
});
</script>