<template>
  <div
    class="modal"
    :class="{ 'modal--shown': modalShown }"
    @click="overlayClick"
  >
    <div class="modal-container">
      <div class="input-wrapper">
        <input
          class="input-wrapper__input"
          placeholder="Enter a task..."
          v-model="task"
        />
        <span
          class="input-wrapper__placeholder"
          :class="{ 'input-wrapper__placeholder--invalid': invalidInput }"
          >{{ invalidInput ? "* required" : "Enter a task..." }}</span
        >
      </div>

      <div class="controls">
        <div class="controls__wrapper">
          <h4 class="controls__title">Urgent Task</h4>
          <input
            id="status-input"
            class="controls-input"
            type="checkbox"
            v-model="isUrgentTask"
          />
          <label class="status-toggle" for="status-input"> </label>
        </div>

        <button class="btn btn--add" @click="modifyData" v-if="!index">
          Add Item
        </button>
        <button class="btn btn--edit" @click="modifyData" v-else>
          Edit Item
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

interface IndexedData {
  [key: string]: any
}

@Component
export default class Modal<T extends HTMLElement, U extends IndexedData> extends Vue {
  isUrgentTask = false;
  modalShown = false;
  task = "";
  index: boolean | string | number = false;
  invalidInput = false;

  private $eventHub: any;

  @Getter("getList") getList: any;
  @Action("addData") addData: any;
  @Action("editData") editData: any;

  overlayClick(e: Event) {
    const { target } = e;

    if ((target as T).classList.contains("modal")) this.modalShown = false;
  }

  modifyData() {
    if (this.task === "") {
      this.invalidInput = true;
      return;
    }

    const listItem = {
      task: this.task,
      isUrgentTask: this.isUrgentTask,
      done: false
    };

    if (this.index) {
      this.editData({ index: +this.index, data: listItem });
    } else {
      this.addData(listItem);
    }

    this.modalShown = false;
  }

  created() {
    this.$eventHub.$on("modal-toggle", (params: U) => {
      const { action, index } = params;

      this.modalShown = action === "show";

      if (index) {
        this.index = index;

        for (const [key, value] of Object.entries(this.getList[index])) {
          if (key === "done") continue;

          (this as any)[key] = value;
        }
      }
    });
  }

  destroyed() {
    this.$eventHub.$off("modal-toggle");
  }

  @Watch("modalShown")
  onVisibilityChange(value: boolean) {
    if (value) return;

    this.isUrgentTask = false;
    this.task = "";
    this.index = false;
    this.invalidInput = false;
  }
}
</script>

<style lang="scss" scoped>
.modal {
  background-color: var(--overlay);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  &--shown {
    opacity: 1;
    visibility: visible;
  }
}

.modal-container {
  width: 76.8rem;
  border-radius: 0.3rem;
  background-color: var(--white);
  padding: 2.4rem;
  display: flex;
  align-items: center;

  > * {
    flex-basis: 50%;
  }

  @media (max-width: 768px) {
    margin-left: 1.6rem;
    margin-right: 1.6rem;
    flex-direction: column;
    align-items: stretch;
  }
}

.input-wrapper {
  position: relative;
  width: 100%;
  padding-right: 1.6rem;

  @media (max-width: 768px) {
    padding-right: 0;
  }

  &__input {
    border: none;
    font-size: 1.6rem;
    padding: 0.8rem;
    border-bottom: 0.2rem solid var(--light-blue);
    transition: border-bottom-color 0.2s ease;
    width: 100%;

    &::-webkit-input-placeholder {
      color: transparent;
    }

    &:focus {
      border-bottom-color: var(--main-dark-blue);
    }
  }

  &__placeholder {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translate(-1.6rem, calc(-100% - 1.6rem)) scale(0.8);
    opacity: 1;
    transition: transform 0.2s ease, opacity 0.2s ease, color 0.2s ease;
    pointer-events: none;

    &--invalid {
      color: var(--main-dark-red);
    }
  }

  &__input:placeholder-shown + &__placeholder {
    transform: translateY(-50%);
    opacity: 0.6;
  }
}

.controls-input {
  display: none;
}

.controls {
  display: flex;
  align-items: center;
  padding-left: 1.6rem;
  border-left: 0.1rem solid var(--main-light-gray);

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 1.6rem;
    border: none;
  }

  &__title {
    font-size: 1.6rem;
  }
}

.status-toggle {
  display: inline-block;
  border-radius: 10rem;
  cursor: pointer;
  width: 4rem;
  height: 2.4rem;
  background-color: var(--main-light-gray);
  position: relative;
  padding: 0.3rem;
  user-select: none;
  margin-top: 0.8rem;
  transition: background-color 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    left: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
    background-color: var(--white);
    transition: transform 0.2s ease;
  }
}

.controls-input:checked + .status-toggle {
  background-color: var(--main-dark-red);

  &::before {
    transform: translate(calc(100% - 0.3rem), -50%);
  }
}

.btn {
  font-size: 1.6rem;
  padding: 0.8rem 1.6rem;
  border: none;
  color: var(--white);
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: auto;

  &--add {
    background-color: var(--main-light-green);

    &:hover {
      background-color: var(--main-dark-green);
    }
  }

  &--edit {
    background-color: var(--sky-blue-light);

    &:hover {
      background-color: var(--sky-blue-dark);
    }
  }
}
</style>
