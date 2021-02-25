<template>
  <div class="main">
    <the-header />

    <div class="main-wrapper" v-if="getList.length > 0">
      <list-item
        :data="item"
        :index="index"
        v-for="(item, index) in getList"
        :key="index"
      />
    </div>

    <div class="empty-list" v-else>
      <svg class="empty-list__icon">
        <use xlink:href="@/assets/images/sprite.svg#icon-alert-triangle"></use>
      </svg>

      <h2 class="empty-list__text">Nothing found</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import TheHeader from "@/components/the-header/index.vue";
import listItem from "@/components/list-item/index.vue";

@Component({
  components: {
    TheHeader,
    listItem
  }
})
export default class Home extends Vue {
  @Getter("getList") getList: any;
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 76.8rem;
  width: 100%;
  padding-top: 2.4rem;

  @media (max-width: 768px) {
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
}

.main-wrapper {
  padding-top: 1.6rem;
}

.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 0;

  &__icon {
    height: 5.6rem;
    width: 5.6rem;
    fill: var(--main-dark-yellow);
  }

  &__text {
    margin-top: 0.8rem;
    font-size: 2rem;
  }
}
</style>
