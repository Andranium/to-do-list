/* eslint-disable */
interface IndexedProperties {
  [key: string]: any;
}

const state = () => ({
  list: []
});

const getters = {
  getList<T extends IndexedProperties>(state: T) {
    return state.list;
  }
};

const mutations = {
  addItem<T extends IndexedProperties>(state: T, payload: T) {
    state.list.push(payload);
  },

  deleteItem<T extends IndexedProperties>(state: T, index: number) {
    state.list.splice(index, 1);
  },

  editItem<T extends IndexedProperties>(state: T, payload: T) {
    const { index, data } = payload;
    state.list.splice(index, 1, data);
  },

  checkItem<T extends IndexedProperties>(state: T, index: number) {
    state.list[index].done = true;
  }
};

const actions = {
  fetchData<T extends IndexedProperties>({ dispatch }: T) {
    const todoList = localStorage.getItem("todoList");

    if (!todoList) return;

    const parsedData = JSON.parse(todoList);
    parsedData.forEach((data: T) => {
      dispatch("addData", data);
    });
  },

  addData<T extends IndexedProperties>({ commit }: T, payload: T) {
    commit("addItem", payload);
  },

  deleteData<T extends IndexedProperties>({ commit }: T, index: number) {
    commit("deleteItem", index);
  },

  editData<T extends IndexedProperties>({ commit }: T, payload: T) {
    commit("editItem", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
