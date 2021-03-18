import Vue from "vue";
import Vuex from "vuex";
import VueRouter, { RawLocation, RouteConfig } from "vue-router";
import Buefy from "buefy";

/* TODO: JUST FOR DEBUG PURPOSE */
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Buefy, {
    defaultIconPack: "fas",
});

export { Vue, VueRouter, Vuex, Buefy, RawLocation, RouteConfig };
