/* eslint-disable */
<template>
  <header class="header">
    <h1 class="header__name">To do app</h1>

    <button class="header__button" @click="openModal">
      <svg><use xlink:href="@/assets/images/sprite.svg#icon-plus"></use></svg>
    </button>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TheHeader extends Vue {
  private $eventHub: any;

  openModal() {
    this.$eventHub.$emit("modal-toggle", { action: "show" });
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.6rem;
  border-bottom: 0.1rem solid var(--main-light-gray);

  &__name {
    font-size: 2.4rem;
  }

  &__button {
    background-color: transparent;
    border: none;
    height: 2.4rem;
    width: 2.4rem;
    cursor: pointer;
    border-radius: 0.3rem;
    transition: background-color 0.2s ease, transform 0.2s ease;

    svg {
      height: 100%;
      width: 100%;
    }

    &:hover {
      background-color: var(--main-light-gray);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
