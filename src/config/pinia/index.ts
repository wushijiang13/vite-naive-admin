import { defineStore } from "pinia";
import { setLocalData , getLocalData, getKeyFindDelete } from "@utils";
import { recursionBread} from "@utils/bread";
import {badgeValue, flatList} from '@components/layout/config/layout.config'
import type { menuOptions,ThemeConfig } from '@types'
import {nextTick } from 'vue';
import {router} from "@/config/router/router";

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
  themeConfigs:{} as ThemeConfig,
  menuValue:'overviews',//默认是概览
  bread:[] as menuOptions[],
  tabPageList:[] as menuOptions[],
  tabPageActive:'' as string,
  refresh:true,
  excludePage:[] as any[],
  loadingBar:null as any,
  badgeValue:1 as number,
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
    /**
     * 将指定name 从禁止缓存list 中移除
     */
    getNameExcludePageDelete(name:string){
      if(name == ''){
        return;
      }
      this.excludePage =  getKeyFindDelete(this.excludePage,'',name);
    },
    /**
     * 刷新页面组件
     */
    async refreshPageComponents(){
      this.refresh = false;
      //移除缓存中在当前选中的组件
      this.excludePage.push(this.tabPageActive);
      await nextTick(async ()=>{
        await setTimeout(()=>{
          this.refresh = true;
          this.getNameExcludePageDelete(this.tabPageActive)
        },300)
      })
      await "success";
    },
    /**
     * 通过parendKey 生成二级面包屑
     * @param key
     * @param item
     */
    generateBread(key: string, item: menuOptions){
      let breads:[] = [];
      this.TabPageListPush(item);
      this.tabPageActive = item.key
      recursionBread(key,item,flatList,breads);
      this.bread = breads;
    },
    TabPageListClear(type:string='all',key:string=''){
      try {
        switch (type) {
          case "all":{
            this.tabPageList = [];
            break;
          }
          case 'left':{
            let tarIndex = this.tabPageList.findIndex(item=>item.key == key);
            if(tarIndex == -1 ){
              //TODO 这里应该加入一个错误提示。无效删除操作
              return ;
            }
            this.tabPageList.splice(1,tarIndex-1);
            break;
          }
          case 'right':{
            let tarIndex = this.tabPageList.findIndex(item=>item.key == key);
            if(tarIndex == -1 ){
              //TODO 同上
              return ;
            }
            this.tabPageList.splice(tarIndex+1,this.tabPageList.length);
            break;
          }
          case 'other': {
            let tar:menuOptions|undefined = this.tabPageList.find(item=>item.key == key);
            this.TabPageListInit();
            if(tar){
              this.TabPageListPush(tar);
            }
            break;
          }
          case 'current':{
            let tarIndex = this.tabPageList.findIndex(item=>item.key == key);
            if(tarIndex == -1 || this.tabPageActive == 'overivew'){
              //TODO 同上
              return ;
            }
            this.tabPageList.splice(tarIndex,1);
            this.tabPageActive =  this.tabPageList[this.tabPageList.length-1].key;
            break;
          }
        }
      }catch (err){
        //TODO 应该对整体加入一个错误验证
      }
    },
    /**
     * 初始化 tab
     * @constructor
     */
    TabPageListInit(){
      this.TabPageListClear();
      this.tabPageList.push(flatList[0]);
    },
    TabPageListPush(target:menuOptions){
      let isPush =  this.tabPageList.findIndex(item=> target.key == item.key);
      if(isPush == -1){
        this.tabPageList.push(target);
      }
    },
    TabPageListDelete(key:string| number){
      this.tabPageList =  getKeyFindDelete(this.tabPageList,'key',key);
    },
    /**
     * 刷新组件loading组件加载
     */
    async loadingRefresh(){
      await this.loadingBar.start()
      await this.refreshPageComponents();
      this.loadingBar.finish();
    },
    dropDownSelect(key: string | number) {
      let tabKey = this.tabPageActive;
      switch(key){
        case 'refresh':{
          this.loadingRefresh()
          break;
        }
        case 'closeOther':{
          this.TabPageListClear('other',tabKey);
          break;
        }
        case 'closeLeft':{
          this.TabPageListClear('left',tabKey);
          break;
        }
        case 'closeRight':{
          this.TabPageListClear('right',tabKey);
          break;
        }
        case 'closeAll':{
          this.TabPageListInit();
          this.tabPageActive = this.tabPageList[0].key;
          break;
        }
        case 'closeCurrent':{
          this.TabPageListClear('current',tabKey);
        }
      }
    },
    getKeyActiveMenu(){
      console.log(this.tabPageActive);
      this.$patch({
        menuValue:this.tabPageActive,
      })
      router.push({name:this.tabPageActive});
    },
    /**
     * 设置菜单选中并跳转
     * @param key
     * @param targetItem
     */
    menuAction(key:string,targetItem:menuOptions){
      this.generateBread(key,targetItem);
      this.$patch({
        menuValue:key,
      })
      if(targetItem["params"]){
        router.push({name:key,params:targetItem.params});
      }else {
        router.push({name:key})
      }
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
