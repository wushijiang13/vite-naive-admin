import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {routers} from './index';

function initRouter(routes:RouteRecordRaw[]=routers){
     return  createRouter(
        {
            history:createWebHistory(),
            routes,
    })
}

const routerObject = initRouter(routers);

export { routerObject,initRouter };