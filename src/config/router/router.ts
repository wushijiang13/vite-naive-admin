import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {routers} from './index';
import {useStore} from '@pinia'
function initRouter(routes:RouteRecordRaw[]=routers){
     return  createRouter(
        {
            history:createWebHashHistory(),
            routes,
    })
}

const router = initRouter(routers);

router.beforeEach((to, from, next) => {
    const store = useStore();
    const isLogin = store.users?.isLogin;
    const { path ,query } = to;

    // 如果访问登录页且已登录，重定向到概览
    if (path === '/login' && isLogin) {
      return next({ name: 'overivew' });
    }

    // 如果访问需要登录的页面且未登录，重定向到登录页
    if (path !== '/login' && !isLogin) {
      return next({ name: 'login' });
    }

    if (path == '/view' && router.getRoutes().findIndex(item=> item.path == path) == -1) {
        let store = useStore();
        let info = {
            key:"view",
            path:path,
            ...query,
            parendKey:"iframe",
        }
        store.tabPushUrl(info);
    }
    next();
})

export { router,initRouter };