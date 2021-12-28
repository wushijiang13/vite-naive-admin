import {RouteRecordRaw} from 'vue-router'

const routers:Array<RouteRecordRaw>=[
    {
        path:'/',
        name:'index',
        component:() => import('@/page/overivew/overivew.vue'),
    },
]

export { routers };