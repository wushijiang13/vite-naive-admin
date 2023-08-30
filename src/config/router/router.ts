import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {routers} from './index';
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
    const { path ,query } = to;
    if(path == '/view' && router.getRoutes().findIndex(item=> item.path == path) == -1){
        let store = useStore();
        let info = {
            key:"view",
            path:path,
            ...query,
            parendKey:"iframe",
        }
        console.log("测试一下");
        console.log(info);

        store.tabPushUrl(info);
    }
    next();
})

export { router,initRouter };