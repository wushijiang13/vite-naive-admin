import { defineStore } from "pinia";

let INIT_SETTING_STATS:any = {
    active:false,
}

export const useSettingStore =  defineStore('setting',{
    state: ()=> INIT_SETTING_STATS,
    actions: {
        /**
         * 显示主题选择框
         */
        themeShowDrawer(){
            this.active = !this.active
        },
        /**
         * 拷贝源码
         */
        copySourceCode(){
            window.open('https://github.com/wushijiang13/vite-naive-admin')
        }
    },
    getters: {
    }
});

