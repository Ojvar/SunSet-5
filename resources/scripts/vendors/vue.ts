import Buefy from "buefy";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

/* TODO: JUST FOR DEBUG PURPOSE */
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Buefy, {
    defaultIconPack: "fas",
});

export { Vue, VueRouter };
export { Buefy };
export { Vuex };
