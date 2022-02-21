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
    // if (fullPath === "/login") {
    //     next();
    // } else if (!isLogin) {
    //     return next({
    //         path: "/login"
    //     });
    // } else if (fullPath === "/permission") {
    //     next();
    // } else {
    //     const code = to.meta[to.meta.code as string];
    //     let token = getLocalData("USERS")?.token;
    //     if (token !== store.state.users.token) {
    //         window.location.reload();
    //     }
    //     if (store.getters.getPower(code)) {
    //         next();
    //     } else {
    //         return next({
    //             path: "/permission"
    //         });
    //     }
    // }
})

export { router,initRouter };