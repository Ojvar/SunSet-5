<template lang="pug">
.section.has-text-centered
    h1.title.is-1.has-text-primary
        | Login to system
    .form
        .field
            label.label Email
            input(type="email")
        .field
            label.label Password
            input(type="password")
        .field
            a.button.is-primary
                | Login
</template>

<script lang="ts">
import { Vue } from "@Scripts/vendors/vue";

export default Vue.extend({
    /*  */
});
</script>