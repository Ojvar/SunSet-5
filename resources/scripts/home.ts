import Vue from "vue";
import Logo from "@VueC/logo.vue";

new Vue({
    el: "#app",

    components: {
        Logo,
    },

    data: () => ({
        name: "ali",
    }),
});
