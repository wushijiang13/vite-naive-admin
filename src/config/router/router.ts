import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {routers} from './index';
import store from '@/config/store'
import {getLocalData} from "@utils";

function initRouter(routes:RouteRecordRaw[]=routers){
     return  createRouter(
        {
            history:createWebHistory(),
            routes,
    })
}


const router = initRouter(routers);

router.beforeEach((to, from, next) => {
    const { isLogin } = store.state.users || {};
    const { path, fullPath } = to;
    next();
})

export { router,initRouter };