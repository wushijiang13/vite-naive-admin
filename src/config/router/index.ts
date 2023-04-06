import layout from '@/components/layout/index.vue'
import type { RouteRecordRaw} from "vue-router";
const routers:RouteRecordRaw[]=[
    {
        path:'/',
        name:'index',
        component:layout,
        redirect:'/overivew',
        children: [
            {
                path:'/overivew',
                name:'overivew',
                meta:{
                    code:'overivew',
                    pageName:"概览",
                    overivew:'@/views/overivew/overivew.vue',
                    
                },
                component:() => import('@/views/overivew/overivew.vue'),
            },
            {
                path:'/likeIcon',
                name:'likeIcon',
                meta:{
                    code:'likeIcon',
                    pageName:"图标",
                    likeIcon:'@/views/icons/likeIcon.vue',
                },
                component:() => import('@/views/icons/likeIcon.vue'),
            },
            {
                path:'/table/synthesis',
                name:'synthesis',
                meta:{
                    code:'synthesis',
                    pageName:"综合表格",
                    synthesis:'@/views/table/synthesis.vue',
                },
                component:() => import('@/views/table/synthesis/synthesis.vue'),
            },
            {
                path:'/table/lineEditing',
                name:'inline',
                meta:{
                    code:'inline',
                    pageName:"行内表格",
                    synthesis:'@/views/table/inline.vue',
                },
                component:() => import('@/views/table/lineEditing/inline.vue'),
            },
            {
                path:'/list',
                name:'list',
                meta:{
                    code:'list',
                    pageName:"列表",
                    synthesis:'@/views/list/list.vue',
                },
                component:() => import('@/views/list/list.vue'),
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/views/login/login.vue')
    },
]

export { routers };