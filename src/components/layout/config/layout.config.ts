/*暂定设计*/
// 关于这里的key 既代表code 也代表 页面路由的code 这样跳转不加任何处理
import { NIcon } from 'naive-ui';
import { h } from 'vue'
import {
    BookOutline as BookIcon,
} from '@vicons/ionicons5'

// @ts-ignore
function renderIcon (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

export interface menuOptions{
    label:string,
    key:string,
    parendKey?:string,
    icon?:any,
    disabled?:boolean,
    children?:menuOptions[],
}
export const menuOption:menuOptions[]=[
    {
        label: '概览',
        key: 'overivew',
        icon: renderIcon(BookIcon)
    },
    {
        label: '项目与录屏',
        key: 'projectsAndScree',
        icon: renderIcon(BookIcon),
        children: [
            {
                label: '项目管理',
                key: 'project',
                parendKey:"projectsAndScree",
            },
            {
                label:"录屏管理",
                key: 'screen',
                parendKey:"projectsAndScree",
            }
        ]
    },
    {
        label: '数据',
        key: 'data',
        icon: renderIcon(BookIcon),
    },
    {
        label: '系统',
        key: 'system',
        icon: renderIcon(BookIcon),
        children: [
            {
                label: '操作日志',
                key: 'operationLog',
                parendKey:"system",
            },
            {
                label:"产品线管理",
                key: 'product',
                parendKey:"system",
            },
            {
                label:"广告主管理",
                key: 'advertise',
                parendKey:"system",
            },
            {
                label:"账户管理",
                key: 'account',
                parendKey:"system",
            },
            {
                label:"角色管理",
                key: 'role',
                parendKey:"system",
            }
        ]
    },
];
