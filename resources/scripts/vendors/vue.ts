import VueRouter, { RawLocation, RouteConfig } from "vue-router";
import Vuex, { Store, StoreOptions } from "vuex";

import Buefy from "buefy";
import Vue from "vue";

/* TODO: JUST FOR DEBUG PURPOSE */
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Buefy, {
    defaultIconPack: "fas",
});

export { Vue, VueRouter };
export { Buefy };
export { RawLocation, RouteConfig };
export { Vuex, Store, StoreOptions };
