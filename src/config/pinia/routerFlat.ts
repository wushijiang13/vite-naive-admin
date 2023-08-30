import { defineStore } from "pinia";
import {menuOption} from "@components/layout/config/layout.config";

let INIT_ROUTER_STATS:any = {
    flatList:[],
    flatObject:{}
}
const flatArray = (arr:any)=>{
    INIT_ROUTER_STATS.flatList.push(...arr);
    arr.forEach((item:any)=>{
        INIT_ROUTER_STATS.flatObject[item.key] = item;
        if (item.hasOwnProperty("children")) {
            flatArray(item.children);
        }
    })
}
flatArray(menuOption.value);
export const useRouterStore =  defineStore('routerFlat',{
    state: ()=> INIT_ROUTER_STATS,
    actions: {
        flatObjectPush(newRouter:any){
            this.flatList.push(newRouter)
            this.flatObject[newRouter.key] = newRouter;
        }
    },
    getters: {
    }
});

