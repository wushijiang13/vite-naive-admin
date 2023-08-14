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
                },
                component:() => import('@/views/overivew/overivew.vue'),
            },
            {
                path:'/components',
                name:'components',
                children:[
                    {
                        path:'likeIcon',
                        name:'likeIcon',
                        meta:{
                            code:'likeIcon',
                            pageName:"图标",
                        },
                        component:() => import('@/views/components/icons/likeIcon.vue'),
                    },
                    {
                        path:'table/synthesis',
                        name:'synthesis',
                        meta:{
                            code:'synthesis',
                            pageName:"综合表格",
                        },
                        component:() => import('@/views/components/table/synthesis/synthesis.vue'),
                    },
                    {
                        path:'table/lineEditing',
                        name:'inline',
                        meta:{
                            code:'inline',
                            pageName:"行内表格",
                        },
                        component:() => import('@/views/components/table/lineEditing/inline.vue'),
                    },
                    {
                        path:'list',
                        name:'list',
                        meta:{
                            code:'list',
                            pageName:"列表",
                        },
                        component:() => import('@/views/components/list/list.vue'),
                    },
                    {
                        path:'desc',
                        name:'desc',
                        meta:{
                            code:'desc',
                            pageName:"描述",
                        },
                        component:() => import('@/views/components/desc/desc.vue'),
                    },
                    {
                        path:'calendar',
                        name:'calendar',
                        meta:{
                            code:'calendar',
                            pageName:"日历",
                        },
                        component:() => import('@/views/components/calendar/calendar.vue'),
                    },
                    {
                        path:'qqDoc',
                        name:'qqDoc',
                        meta:{
                            code:'qqDoc',
                            pageName:"腾讯文档",
                        },
                        component:() => import('@/views/components/editor/qqDoc.vue'),
                    },
                    {
                        path:'synthesizeFrom',
                        name:'synthesizeFrom',
                        meta:{
                            code:'synthesizeFrom',
                            pageName:"综合表单",
                        },
                        component:() => import('@/views/components/form/synthesizeFrom.vue'),
                    },
                    {
                        path:'distributionFrom',
                        name:'distributionFrom',
                        meta:{
                            code:'distributionFrom',
                            pageName:"综合表单",
                        },
                        component:() => import('@/views/components/form/distributionFrom.vue'),
                    },
                    {
                        path:'button',
                        name:'button',
                        meta:{
                            code:'button',
                            pageName:"按钮",
                        },
                        component:() => import('@/views/components/form/button.vue'),
                    },
                    {
                        path:'link',
                        name:'link',
                        meta:{
                            code:'link',
                            pageName:"文字链接",
                        },
                        component:() => import('@/views/components/form/link.vue'),
                    },
                    {
                        path:'radio',
                        name:'radio',
                        meta:{
                            code:'radio',
                            pageName:"单选框",
                        },
                        component:() => import('@/views/components/form/radio.vue'),
                    },
                    {
                        path:'input',
                        name:'input',
                        meta:{
                            code:'input',
                            pageName:"输入框",
                        },
                        component:() => import('@/views/components/form/input.vue'),
                    },
                    {
                        path:'inputNumber',
                        name:'inputNumber',
                        meta:{
                            code:'inputNumber',
                            pageName:"计数器",
                        },
                        component:() => import('@/views/components/form/inputNumber.vue'),
                    },
                    {
                        path:'select',
                        name:'select',
                        meta:{
                            code:'select',
                            pageName:"选择器",
                        },
                        component:() => import('@/views/components/form/select.vue'),
                    },
                    {
                        path:'switch',
                        name:'switchs',
                        meta:{
                            code:'switchs',
                            pageName:"开关",
                        },
                        component:() => import('@/views/components/form/switchs.vue'),
                    },
                    {
                        path:'slider',
                        name:'slider',
                        meta:{
                            code:'slider',
                            pageName:"滑块",
                        },
                        component:() => import('@/views/components/form/slider.vue'),
                    },
                    {
                        path:'timePicker',
                        name:'timePicker',
                        meta:{
                            code:'timePicker',
                            pageName:"时间选择器",
                        },
                        component:() => import('@/views/components/form/timePicker.vue'),
                    },
                    {
                        path:'datePicker',
                        name:'datePicker',
                        meta:{
                            code:'datePicker',
                            pageName:"日期选择器",
                        },
                        component:() => import('@/views/components/form/datePicker.vue'),
                    },
                    {
                        path:'dateTimePicker',
                        name:'dateTimePicker',
                        meta:{
                            code:'dateTimePicker',
                            pageName:"日期时间选择器",
                        },
                        component:() => import('@/views/components/form/dateTimePicker.vue'),
                    },
                    {
                        path:'rate',
                        name:'rate',
                        meta:{
                            code:'rate',
                            pageName:"评分",
                        },
                        component:() => import('@/views/components/form/rate.vue'),
                    },
                ],
            },
            {
                path:'/other',
                name:'other',
                children:[
                    {
                        path:'workflow',
                        name:'workflow',
                        meta:{
                            code:'workflow',
                            pageName:"工作流",
                        },
                        component:() => import('@/views/other/workflow.vue'),
                    },
                    {
                        path:'chart',
                        name:'chart',
                        meta:{
                            code:'chart',
                            pageName:"图表",
                        },
                        component:() => import('@/views/other/chart.vue'),
                    },
                    {
                        path:'print',
                        name:'print',
                        meta:{
                            code:'print',
                            pageName:"打印",
                        },
                        component:() => import('@/views/other/print.vue'),
                    },
                    {
                        path:'notice',
                        name:'notice',
                        meta:{
                            code:'notice',
                            pageName:"通知",
                        },
                        component:() => import('@/views/other/notice.vue'),
                    },
                    {
                        path:'timeline',
                        name:'timeline',
                        meta:{
                            code:'timeline',
                            pageName:"时间线",
                        },
                        component:() => import('@/views/other/timeline.vue'),
                    },
                    {
                        path:'manyTab',
                        name:'manyTab',
                        meta:{
                            code:'manyTab',
                            pageName:"多标签",
                        },
                        component:() => import('@/views/other/manyTab.vue'),
                    },
                    {
                        path:'watermark',
                        name:'watermark',
                        meta:{
                            code:'watermark',
                            pageName:"水印",
                        },
                        component:() => import('@/views/other/watermark.vue'),
                    },
                    {
                        path:'share',
                        name:'share',
                        meta:{
                            code:'share',
                            pageName:"分享",
                        },
                        component:() => import('@/views/other/share.vue'),
                    },
                    {
                        path:'dynamicAnchor',
                        name:'dynamicAnchor',
                        meta:{
                            code:'dynamicAnchor',
                            pageName:"动态锚点",
                        },
                        component:() => import('@/views/other/dynamicAnchor.vue'),
                    },
                    {
                        path:'dynamicMeta',
                        name:'dynamicMeta',
                        meta:{
                            code:'dynamicMeta',
                            pageName:"动态锚点",
                        },
                        component:() => import('@/views/other/dynamicMeta.vue'),
                    },
                    {
                        path:'dynamicParams',
                        name:'dynamicParams',
                        meta:{
                            code:'dynamicParams',
                            pageName:"动态路径参数",
                        },
                        children:[
                            {
                                path:'params1/:id',
                                name:'params1',
                                meta:{
                                    code:'params1',
                                    pageName:"Params id=1",
                                },
                                component:() => import('@/views/other/dynamicParams/params1.vue'),
                            },
                            {
                                path:'query',
                                name:'query1',
                                meta:{
                                    code:'query1',
                                    pageName:"Query id=1",
                                },
                                component:() => import('@/views/other/dynamicParams/query1.vue'),
                            },
                        ],
                    },
                    {
                        path:'drag',
                        name:'drag',
                        meta:{
                            code:'drag',
                            pageName:"拖拽",
                        },
                        children:[
                            {
                                path:'modalDrag',
                                name:'modalDrag',
                                meta:{
                                    code:'modalDrag',
                                    pageName:"弹框拖拽",
                                },
                                component:() => import('@/views/other/drag/modalDrag.vue'),
                            },
                            {
                                path:'cardDrag',
                                name:'cardDrag',
                                meta:{
                                    code:'cardDrag',
                                    pageName:"卡片拖拽",
                                },
                                component:() => import('@/views/other/drag/cardDrag.vue'),
                            },
                        ],
                    },
                    {
                        path:'multiRouter1/multiRouter1-1/multiRouter1-1-1/multiRouter1-1-1-1',
                        name:'multiRouter1-1-1-1',
                        meta:{
                            code:'multiRouter',
                            pageName:"多级路由1-1-1-1",
                        },
                        component:()=> import('@/views/other/multiRouter.vue')
                    },
                ]
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/views/login/login.vue')
    },
    {
        path:'/noLayout',
        name:'noLayout',
        component:() => import('@/views/other/noLayout.vue')
    },
]

export { routers };