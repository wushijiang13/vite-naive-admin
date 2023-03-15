import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {routers} from './index';
import {getLocalData} from "@utils";
import {useStore} from '@pinia'
function initRouter(routes:RouteRecordRaw[]=routers){
     return  createRouter(
        {
            history:createWebHistory(),
            routes,
    })
}

const router = initRouter(routers);

router.beforeEach((to, from, next) => {
    const store = useStore();
    const { isLogin } = store.users || {};
    const { path, fullPath } = to;
    next();
})

export { router,initRouter };