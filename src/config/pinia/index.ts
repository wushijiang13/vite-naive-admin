import { defineStore } from "pinia";
import { setLocalData , getLocalData } from "@utils";
import layoutConventional from "@/components/layout/src/layout-conventional.vue";
import { menuOptions } from "@utils/bread";
const INIT_USERS = {
  email: "",
  username: "",
  password: "",
  isLogin: false,
  remember: false,
  token: "",
  code: [],
  pageTree:[],
};

const INIT_STATE = {
  users: getLocalData("USERS") || INIT_USERS,
  routerPermissions:[],
  themeConfigs:{
    label: "常规布局",
    key: "conventional",
    value: layoutConventional
  },
  tabPageList:[] as menuOptions[],
  tabPageActive:'',
};

export const useStore =  defineStore('store',{
  state: ()=> INIT_STATE,
  actions: {
    login: ({ commit }, params) => {
      commit("setUsers", {
        ...params,
        isLogin: true
      });
    },
    loginOut: ({ commit }) => {
      commit("setUsers", {
        isLogin: false
      });
      window.location.href = "/login";
    },
    setUsers( payload) {
      this.users = Object.assign({}, this.users, payload);
      setLocalData("USERS", this.users);
    },
    TabPageListClear(){
      this.tabPageList = [];
    },
    TabPageListPush(target:menuOptions){
      let isPush =  this.tabPageList.findIndex(item=> target.key == item.key);
      if(isPush == -1){
        this.tabPageList.push(target);
      }
    },
    TabPageListDelete(target:menuOptions){
      let targetIndex =  this.tabPageList.findIndex((item:menuOptions)=> item.key == target.key)
      this.tabPageList.splice(targetIndex,1);
    },
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
