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
    },
    {
        label: '组件',
        key: 'subassembly',
        children: [
            {
                label: '图标',
                key: 'likeIcon',
                parendKey:"subassembly",
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
                    },
                    {
                        label:"行内编辑表格",
                        key: 'Inline',
                        parendKey:"table",
                    },
                    {
                        label:"自定义表格",
                        key: 'custom',
                        parendKey:"table",
                    },
                    {
                        label:"动态表格",
                        key: 'dynamic',
                        parendKey:"table",
                    },
                ],
            },
            {
                label:"列表",
                key: 'list',
                parendKey:"subassembly",
            },
            {
                label:"描述",
                key: 'desc',
                parendKey:"subassembly",
            },
            {
                label:"日历",
                key: 'calendar',
                parendKey:"subassembly",
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
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"分布表单",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"按钮",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"文字链接",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"单选框",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"多选框",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"输入框",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"计数器",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"选择器",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"开关",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"滑块",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"时间选择器",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"日期选择器",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"日期时间选择器",
                        key: 'screen',
                        parendKey:"form",
                    },
                    {
                        label:"评分",
                        key: 'screen',
                        parendKey:"form",
                    },
                ],
            },
        ]
    },
    {
        label: '其他',
        key: 'other',
        children: [
            {
                label: '工作流',
                key: 'operationLog',
                parendKey:"other",
            },
            {
                label:"图表",
                key: 'product',
                parendKey:"other",
            },
            {
                label:"打印",
                key: 'advertise',
                parendKey:"other",
            },
            {
                label:"通知",
                key: 'account',
                parendKey:"other",
            },
            {
                label:"时间线",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"多标签",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"水印",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"分享",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"动态锚点",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"动态Meta",
                key: 'role',
                parendKey:"other",
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
                    },
                    {
                        label:"Query id=1",
                        key: 'role',
                        parendKey:"dynamicParams",
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
                    },
                    {
                        label:"卡片拖拽",
                        key: 'role',
                        parendKey:"drag",
                    }
                ]
            },
            {
                label:"无框",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"上传",
                key: 'role',
                parendKey:"other",
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
            },
            {
                label:"Css动画",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"第三方登录",
                key: 'role',
                parendKey:"other",
            },
            {
                label:"外链",
                key: 'role',
                parendKey:"other",
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
                    },
                    {
                        label:"哔哩哔哩",
                        key: 'role',
                        parendKey:"iframe",
                    },
                    {
                        label:"自定义iframe",
                        key: 'role',
                        parendKey:"iframe",
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
                    },
                    {
                        label:"导出选中行Excel",
                        key: 'role',
                        parendKey:"execl",
                    },
                    {
                        label:"导出合并Excel",
                        key: 'role',
                        parendKey:"execl",
                    }
                ]
            },
        ]
    },
];

export let flatList:[] = [];

const flatMeun = ():void=>{
    flatArray(menuOption);
    console.log(flatList);
}
function flatArray(arr:any){
    // @ts-ignore
    flatList.push(...arr);
    arr.forEach((item:any)=>{
        if (item.hasOwnProperty("children")) {
            flatArray(item.children);
        }
    })
}
flatMeun();

