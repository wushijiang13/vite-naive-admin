import layout from '@/components/layout/index.vue'

const routers:Object[]=[
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
                    overivew:'@/views/overivew/overivew.vue',
                    
                },
                component:() => import('@/views/overivew/overivew.vue'),
            },
            {
                path:'/likeIcon',
                name:'likeIcon',
                meta:{
                    code:'likeIcon',
                    likeIcon:'@/views/icons/likeIcon.vue',
                },
                component:() => import('@/views/icons/likeIcon.vue'),
            },
            {
                path:'/table/synthesis',
                name:'synthesis',
                meta:{
                    code:'synthesis',
                    synthesis:'@/views/table/synthesis.vue',
                },
                component:() => import('@/views/table/synthesis/synthesis.vue'),
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