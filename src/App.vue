/* eslint-disable */
<template>
  <div id="app">
    <router-view />
    <the-modal />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

interface IndexedData {
  [key: string]: any;
}

@Component
export default class App<T extends IndexedData> extends Vue {
  @Getter("getList") getList: any;
  @Action("fetchData") fetchData: any;

  created() {
    if (!(process as T).browser) return;

    this.fetchData();
  }

  @Watch("getList", { deep: true })
  onListChange(value: T) {
    if (!(process as T).browser) return;

    if (value.length === 0) {
      localStorage.removeItem("todoList");
      return;
    }

    localStorage.setItem("todoList", JSON.stringify(value));
  }
}
</script>

<style lang="scss">
:root {
  --white: #ffffff;
  --overlay: #00000066;
  --main-light-gray: #d3d3d373;
  --main-dark-red: #e84118;
  --sky-blue-light: #59c6ff;
  --sky-blue-dark: #00a8ff;
  --main-dark-blue: #273c75;
  --light-blue: #273c7557;
  --main-dark-green: #44bd32;
  --main-light-green: #44bd32ab;
  --main-dark-yellow: #fbc531;
}

#app {
  display: flex;
  justify-content: center;
}
</style>
