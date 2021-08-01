<template lang="pug">
.centerize-container
    h1.has-text-centered.title.is-1.has-text-primary
        p
            | Oops!
            br
            | Route Not Found
</template>

<script lang="ts">
import { Vue } from "@Scripts/vendors/vue";

/**
 * Logo
 */
export default Vue.extend({
    name: "RouteNotFound",
});
</script>
