import { createStore } from "vuex";
import authModule from "./auth/auth-module";

export default createStore({
  // move to module
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    authModule: authModule, //multiple module
  },
});
