<template lang="pug">
.centerize-container
    .logo(
        :class="isActiveClass",
        version="1.1",
        x="0px",
        y="0px",
        viewBox="0 0 160 140",
        style="enable-background: new 0 0 160 140",
        width="160",
        height="140"
    )
       
</template>

<script lang="ts">
import { Vue } from "@Scripts/vendors/vue";

/**
 * Logo
 */
export default Vue.extend({
    name: "Logo",

    data: () => ({
        isActiveClass: null,
    }),

    /**
     * Mounted
     */
    mounted() {
        setTimeout(() => this.startFill(), 500);
    },

    /**
     * Methods
     */
    methods: {
        /**
         * start logo filling
         */
        startFill() {
            Vue.set(this, "isActiveClass", "active");
        },
    },
});
</script>
