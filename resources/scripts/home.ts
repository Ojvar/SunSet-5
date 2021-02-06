import Vue from "vue";
import Logo from "@VueC/logo.vue";

new Vue({
    el: "#app",

    // template: `
    // <div>
    //     <logo></logo>
    //     <h1>Hello world 2</h1>
    // </div>
    // `,

    components: {
        Logo,
    },

    data: () => ({
        name: "ali",
    }),
});
