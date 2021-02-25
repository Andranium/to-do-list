import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import TheModal from "@/components/the-modal/index.vue";

Vue.component("the-modal", TheModal);

Vue.prototype.$eventHub = new Vue();

import "@/assets/style/global.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
