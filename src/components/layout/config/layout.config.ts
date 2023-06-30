/*暂定设计*/
// 关于这里的key 既代表code 也代表 页面路由的code 这样跳转不加任何处理
import { NIcon } from 'naive-ui';
import {h, nextTick} from 'vue'
import { BookOutline as BookIcon,
    FileTrayFullOutline
} from '@vicons/ionicons5'
import { Home12Regular,Code16Filled,Image24Regular,AppsListDetail24Regular,
    TextDescription24Regular, CalendarRtl28Regular
} from '@vicons/fluent'
import {  recursionBread } from "@utils/bread";
import {likeIcon, overivew,  inline, synthesis,
    list, desc, calendar,synthesizeFrom,distributionFrom,
    button,link,radio,input,inputNumber,select,switchs,slider,
    timePicker,datePicker,dateTimePicker,rate,workflow,chart,print,notice,
    timeline,manyTab,watermark,
} from '@views'
import { useStore } from '@pinia'
import { useRouter }  from 'vue-router'
import type { menuOptions } from '@types'

// @ts-ignore
function renderIcon (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

export const menuOption:menuOptions[]=[
    {
        label: '概览',
        key: 'overivew',
        icon:Home12Regular,
        component:overivew,
        isClose:false,
    },
    {
        label: '组件',
        key: 'subassembly',
        icon:Code16Filled,
        children: [
            {
                label: '图标',
                key: 'likeIcon',
                icon:Image24Regular,
                parendKey:"subassembly",
                component:likeIcon,
                isClose:true,
            },
            {
                label:"表格",
                key: 'table',
                parendKey:"subassembly",
                children:[
                    {
                        label:"综合表格",
                        key: 'synthesis',
                        parendKey:"table",
                        component:synthesis,
                        isClose:true,
                    },
                    {
                        label:"行内编辑表格",
                        key: 'inline',
                        parendKey:"table",
                        component:inline,
                        isClose:true,
                    },
                    {
                        label:"自定义表格",
                        key: 'custom',
                        parendKey:"table",
                        isClose:true,
                    },
                    {
                        label:"动态表格",
                        key: 'dynamic',
                        parendKey:"table",
                        isClose:true,
                    },
                ],
            },
            {
                label:"列表",
                key: 'list',
                parendKey:"subassembly",
                component:list,
                icon:AppsListDetail24Regular,
                isClose:true,
            },
            {
                label:"描述",
                key: 'desc',
                parendKey:"subassembly",
                component:desc,
                icon:TextDescription24Regular,
                isClose:true,
            },
            {
                label:"日历",
                key: 'calendar',
                parendKey:"subassembly",
                component:calendar,
                icon:CalendarRtl28Regular,
                isClose:true,
            },
            {
                label:"编辑器",
                key: 'editor',
                parendKey:"subassembly",
                children:[
                    {
                        label:"腾讯文档",
                        key: 'tencent',
                        parendKey:"editor",
                        isClose:true,
                    },
                ],
            },
            {
                label:"表单",
                key: 'form',
                parendKey:"subassembly",
                children:[
                    {
                        label:"综合表单",
                        key: 'synthesizeFrom',
                        parendKey:"form",
                        component:synthesizeFrom,
                        isClose:true,
                    },
                    {
                        label:"分布表单",
                        key: 'distributionFrom',
                        parendKey:"form",
                        component:distributionFrom,
                        isClose:true,
                    },
                    {
                        label:"按钮",
                        key: 'button',
                        parendKey:"form",
                        component:button,
                        isClose:true,
                    },
                    {
                        label:"文字链接",
                        key: 'link',
                        parendKey:"form",
                        component:link,
                        isClose:true,
                    },
                    {
                        label:"单选框",
                        key: 'radio',
                        parendKey:"form",
                        component:radio,
                        isClose:true,
                    },
                    {
                        label:"多选框",
                        key: 'screen',
                        parendKey:"form",
                        isClose:true,
                    },
                    {
                        label:"输入框",
                        key: 'input',
                        parendKey:"form",
                        component:input,
                        isClose:true,
                    },
                    {
                        label:"计数器",
                        key: 'inputNumber',
                        component:inputNumber,
                        parendKey:"form",
                        isClose:true,
                    },
                    {
                        label:"选择器",
                        key: 'select',
                        component:select,
                        parendKey:"form",
                        isClose:true,
                    },
                    {
                        label:"开关",
                        key: 'switchs',
                        component:switchs,
                        parendKey:"form",
                        isClose:true,
                    },
                    {
                        label:"滑块",
                        key: 'slider',
                        component: slider,
                        parendKey:"form",
                        isClose:true,
                    },
                    {
                        label:"时间选择器",
                        key: 'timePicker',
                        parendKey:"form",
                        component:timePicker,
                        isClose:true,
                    },
                    {
                        label:"日期选择器",
                        key: 'datePicker',
                        component:datePicker,
                        parendKey:"form",
                        isClose:true,
                    },
                    {
                        label:"日期时间选择器",
                        key: 'dateTimePicker',
                        component:dateTimePicker,
                        parendKey:"form",
                        isClose:true,
                    },
                    {
                        label:"评分",
                        key: 'rate',
                        parendKey:"form",
                        component:rate,
                        isClose:true,
                    },
                ],
            },
        ]
    },
    {
        label: '其他',
        key: 'other',
        icon:FileTrayFullOutline,
        children: [
            {
                label: '工作流',
                key: 'workflow',
                parendKey:"other",
                component:workflow,
                isClose:true,
            },
            {
                label:"图表",
                key: 'chart',
                parendKey:"other",
                component:chart,
                isClose:true,
            },
            {
                label:"打印",
                key: 'print',
                parendKey:"other",
                component:print,
                isClose:true,
            },
            {
                label:"通知",
                key: 'notice',
                parendKey:"other",
                component: notice,
                isClose:true,
            },
            {
                label:"时间线",
                key: 'timeline',
                parendKey:"other",
                component: timeline,
                isClose:true,
            },
            {
                label:"多标签",
                key: 'manyTab',
                parendKey:"other",
                component: manyTab,
                isClose:true,
            },
            {
                label:"水印",
                key: 'watermark',
                parendKey:"other",
                component: watermark,
                isClose:true,
            },
            {
                label:"分享",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"动态锚点",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"动态Meta",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"动态路径参数",
                key: 'dynamicParams',
                parendKey:"other",
                children:[
                    {
                        label:"Params id=1",
                        key: 'role',
                        parendKey:"dynamicParams",
                        isClose:true,
                    },
                    {
                        label:"Query id=1",
                        key: 'role',
                        parendKey:"dynamicParams",
                        isClose:true,
                    }
                ]
            },
            {
                label:"拖拽",
                key: 'drag',
                parendKey:"other",
                children:[
                    {
                        label:"弹窗拖拽",
                        key: 'role',
                        parendKey:"drag",
                        isClose:true,
                    },
                    {
                        label:"卡片拖拽",
                        key: 'role',
                        parendKey:"drag",
                        isClose:true,
                    }
                ]
            },
            {
                label:"无框",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"上传",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"多级路由缓存",
                key: 'multiLevelCaching',
                parendKey:"other",
                children:[
                    {
                        label:"多级路由1-1",
                        key: 'multiLevelCaching1-1',
                        parendKey:"multiLevelCaching",
                        children:[
                            {
                                label:"多级路由1-1-1",
                                key: 'multiLevelCaching1-1-1',
                                parendKey:"multiLevelCaching1-1",
                                children:[
                                    {
                                        label:"多级路由1-1-1-1",
                                        key: 'multiLevelCaching1-1-1-1',
                                        parendKey:"multiLevelCaching1-1-1",
                                        isClose:true,
                                    }
                                ]
                            }
                        ]
                    }
                ],
            },
            {
                label:"错误日志模拟",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"Css动画",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"第三方登录",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"外链",
                key: 'role',
                parendKey:"other",
                isClose:true,
            },
            {
                label:"iframe",
                key: 'iframe',
                parendKey:"other",
                children: [
                    {
                        label:"360搜索",
                        key: 'role',
                        parendKey:"iframe",
                        isClose:true,
                    },
                    {
                        label:"哔哩哔哩",
                        key: 'role',
                        parendKey:"iframe",
                        isClose:true,
                    },
                    {
                        label:"自定义iframe",
                        key: 'role',
                        parendKey:"iframe",
                        isClose:true,
                    }
                ]
            },
            {
                label:"Execl",
                key: 'execl',
                parendKey:"other",
                children: [
                    {
                        label:"导出Execl",
                        key: 'role',
                        parendKey:"execl",
                        isClose:true,
                    },
                    {
                        label:"导出选中行Excel",
                        key: 'role',
                        parendKey:"execl",
                        isClose:true,
                    },
                    {
                        label:"导出合并Excel",
                        key: 'role',
                        parendKey:"execl",
                        isClose:true,
                    }
                ]
            },
        ]
    },
];

export let flatList:menuOptions[] = [];
export let flatObject:any = {};

const flatMeun = ():void=>{
    flatArray(menuOption);
}
function flatArray(arr:any){
    // @ts-ignore
    flatList.push(...arr);
    arr.forEach((item:any)=>{
        flatObject[item.key] = item;
        if (item.hasOwnProperty("children")) {
            flatArray(item.children);
        }
    })
}
flatMeun();

