import Vue from "vue";
import Vuex from "vuex";

import school from "./modules/school";

Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    modules: {
      school
    },

    strict: process.env.DEBUGGING
  });

  return Store;
}
