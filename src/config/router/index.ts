import {RouteRecordRaw} from 'vue-router';
import layout from '@/components/layout/index.vue'

const routers:Array<RouteRecordRaw>=[
    {
        path:'/',
        name:'index',
        component:layout,
        children: [
            {
                path:'/overivew',
                // @ts-ignore
                //这里两个用于路由守卫 权限判断使用
                meta:{
                    code:'overivew',
                    overivew:'@/views/overivew/overivew.vue',
                },
                component:() => import('@/views/overivew/overivew.vue'),
            },
            {
                path:'/project',
                component:() =>import('@/views/project/project.vue'),
            },
            {
                path:'/screen',
                component:() =>import('@/views/screen/screen.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/views/login/login.vue')
    },
]

export { routers };