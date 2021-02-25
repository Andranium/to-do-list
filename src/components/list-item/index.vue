/* eslint-disable */
<template>
  <div
    class="item"
    :data-index="index"
    :class="{ 'item--urgent': data.isUrgentTask, 'item--done': data.done }"
  >
    <h2 class="item__name">{{ data.task }}</h2>

    <div class="controls" :class="{ 'controls--shown': toolboxShown }">
      <button
        class="controls__button controls__button--chevron"
        @click="toolboxShown = !toolboxShown"
      >
        <svg>
          <use xlink:href="@/assets/images/sprite.svg#icon-chevron-left"></use>
        </svg>
      </button>
      <button
        class="controls__button controls__button--check"
        :class="{ 'controls__button--disabled': data.done }"
        @click="checkItem(index)"
      >
        <svg>
          <use xlink:href="@/assets/images/sprite.svg#icon-check"></use>
        </svg>
      </button>
      <button
        class="controls__button controls__button--edit"
        :class="{ 'controls__button--disabled': data.done }"
        @click="openModal"
      >
        <svg>
          <use xlink:href="@/assets/images/sprite.svg#icon-edit-2"></use>
        </svg>
      </button>
      <button
        class="controls__button controls__button--remove"
        @click="deleteData(index)"
      >
        <svg>
          <use xlink:href="@/assets/images/sprite.svg#icon-trash-2"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Action, Mutation } from "vuex-class";

interface IndexedData {
  [key: string]: any;
}

@Component
export default class ListItem extends Vue {
  private $eventHub: any;

  @Prop({ type: Object })
  data!: IndexedData;

  @Prop({ type: Number })
  index!: number;

  @Mutation("checkItem") checkItem: unknown;
  @Action("deleteData") deleteData: unknown;

  openModal() {
    this.$eventHub.$emit("modal-toggle", {
      action: "show",
      index: this.index.toString()
    });
  }

  toolboxShown = false;
}
</script>

<style lang="scss" scoped>
.item {
  padding: 1.6rem;
  border-radius: 0.3rem;
  background-color: var(--main-light-gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  transition: background-color 0.2s ease, color 0.2s ease;

  &.item--urgent {
    background-color: var(--main-dark-red);
  }

  &.item--done {
    background-color: var(--main-dark-green);
  }

  &[class*="item--"] {
    color: var(--white);

    svg {
      fill: var(--white);
    }
  }

  &__input {
    display: none;
  }

  &__label {
    height: 2.4rem;
    width: 2.4rem;
    margin-left: auto;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 1.6rem;
  }

  &__name {
    font-size: 2rem;
  }
}

.controls {
  display: flex;
  align-items: center;
  transform: translateX(calc(100% - 1.6rem));
  transition: transform 0.2s ease;

  &--shown {
    transform: translateX(0);

    .controls__button--chevron svg {
      transform: rotate(180deg);
    }
  }

  &__button {
    border: none;
    background-color: transparent;
    height: 2.4rem;
    width: 2.4rem;
    cursor: pointer;
    transition: fill 0.2s ease, transform 0.2s ease, opacity 0.2s ease;

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &:not(:last-child) {
      margin-right: 1.6rem;
    }

    svg {
      transition: transform 0.2s ease;
      height: 100%;
      width: 100%;
    }

    &:active {
      transform: scale(0.9);
    }

    &--edit {
      &:hover {
        fill: var(--main-dark-blue);
      }
    }

    &--remove {
      &:hover {
        fill: var(--main-dark-red);
      }
    }

    &--check {
      &:hover {
        fill: var(--main-dark-green);
      }
    }
  }
}
</style>
