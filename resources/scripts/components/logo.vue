<template lang="pug">
div 
    h1 Logo {{ title }}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data: () => ({
        title: "World",
    }),
});
</script>