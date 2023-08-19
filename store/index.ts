import Vuex, { Commit, Dispatch } from "vuex";

interface Item {
  prod_name:String,
  prod_price:String,
  prod_desc:String,
  prod_id:String,
  prod_date:String
  
}

interface RootState {
  items: Item[];
}

interface UpdateItemPayload {
  index: number;
  updatedItem: Item;
}

const createStore = () => {
  return new Vuex.Store<RootState>({
    state: {
      items: []
    },
    mutations: {
      addItem(state, item: Item) {
        state.items.push(item);
        localStorage.setItem("products", JSON.stringify(state.items));
      },
      updateItem(state, payload: UpdateItemPayload) {
        state.items[payload.index] = payload.updatedItem;
        localStorage.setItem("products", JSON.stringify(state.items));
      },
      deleteItem(state, index: number) {
        state.items.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(state.items));
      },
      setItemsFromLocalStorage(state) {
        const items = localStorage.getItem("products");
        if (items) {
          state.items = JSON.parse(items);
        }
      }
    },
    actions: {
      addItem({ commit }: { commit: Commit }, item: Item) {
        commit("addItem", item);
      },
      updateItem({ commit }: { commit: Commit }, payload: UpdateItemPayload) {
        commit("updateItem", payload);
      },
      deleteItem({ commit }: { commit: Commit }, index: number) {
        commit("deleteItem", index);
      },
      initializeStore({ commit }: { commit: Commit }) {
        commit("setItemsFromLocalStorage");
      }
    },
    getters: {
      getItems(state: RootState) {
        return state.items;
      }
    }
  });
};

export default createStore;