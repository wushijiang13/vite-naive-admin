import { createStore } from "vuex";
import { setLocalData , getLocalData } from "@utils";

const INIT_USERS = {
  email: "",
  username: "",
  password: "",
  isLogin: false,
  remember: false,
  token: "",
  code: [],
  pageTree: []
};

const INIT_STATE = {
  users: getLocalData("USERS") || INIT_USERS,
  routerPermissions:[

  ],
};

export default createStore({
  state: INIT_STATE,
  mutations: {
    // 设置登陆信息
    SET_USERS(state, payload) {
      state.users = Object.assign({}, state.users, payload);
      setLocalData("USERS", state.users);
    },
  },
  actions: {
    login: ({ commit }, params) => {
      commit("SET_USERS", {
        ...params,
        isLogin: true
      });
    },
    loginOut: ({ commit }) => {
      commit("SET_USERS", {
        isLogin: false
      });
      window.location.href = "/login";
    }
  },
  getters: {
    getPower: (state: any) => (id: string[] | string) => {
      if (Array.isArray(id)) {
        return id.some(function(item: string) {
          return state.users.code.includes(item);
        });
      } else {
        return state.users.code.includes(id);
      }
    },
  }
});
