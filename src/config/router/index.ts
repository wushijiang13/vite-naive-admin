import {RouteRecordRaw} from 'vue-router';
import layout from '@/components/layout/index.vue'

const routers:Array<RouteRecordRaw>=[
    {
        path:'/',
        name:'index',
        component:layout,
        children: [
            {
                path:'/',
                component:() => import('@/page/overivew/overivew.vue'),
            },
            {
                path:'/project',
                component:() =>import('@/page/project/project.vue'),
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/page/login/login.vue')
    },
]

export { routers };