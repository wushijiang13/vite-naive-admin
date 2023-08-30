/*暂定设计*/
// 关于这里的key 既代表code 也代表 页面路由的code 这样跳转不加任何处理
import { NIcon,NBadge } from 'naive-ui';
import {h, ref} from 'vue'
import {
    FileTrayFullOutline
} from '@vicons/ionicons5'
import { Home12Regular,Code16Filled,Image24Regular,AppsListDetail24Regular,
    TextDescription24Regular, CalendarRtl28Regular,Table24Regular,TextEditStyle24Regular,
    Textbox24Regular,Flowchart24Regular,ChartMultiple24Regular,Print24Regular,Chat24Regular,
    History24Regular,TabDesktopCopy20Regular,Drop24Regular,ShareAndroid24Regular,CalendarEmpty24Regular,
    ArrowSwap24Regular,CursorHover24Regular,
} from '@vicons/fluent'
import { Anchor } from '@vicons/tabler';
import {likeIcon, overivew,  inline, synthesis,
    list, desc, calendar,qqDoc,synthesizeFrom,distributionFrom,
    button,link,radio,input,inputNumber,select,switchs,slider,
    timePicker,datePicker,dateTimePicker,rate,workflow,chart,print,notice,
    timeline,manyTab,watermark,share,dynamicAnchor,dynamicMeta,params1,query1,
    modalDrag,cardDrag,noLayout,multiRouter,search360,bilibili,customIframe
} from '@views'
import type { menuOptions } from '@types'
import { useStore } from "@pinia";

export const menuOption:menuOptions[]= ref([
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
                icon:Table24Regular,
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
                icon:TextEditStyle24Regular,
                parendKey:"subassembly",
                children:[
                    {
                        label:"腾讯文档",
                        key: 'qqDoc',
                        parendKey:"editor",
                        component:qqDoc,
                        isClose:true,
                    },
                ],
            },
            {
                label:"表单",
                key: 'form',
                icon:Textbox24Regular,
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
                icon:Flowchart24Regular,
                parendKey:"other",
                component:workflow,
                isClose:true,
            },
            {
                label:"图表",
                key: 'chart',
                icon:ChartMultiple24Regular,
                parendKey:"other",
                component:chart,
                isClose:true,
            },
            {
                label:"打印",
                key: 'print',
                icon:Print24Regular,
                parendKey:"other",
                component:print,
                isClose:true,
            },
            {
                label:"通知",
                key: 'notice',
                icon:Chat24Regular,
                parendKey:"other",
                component: notice,
                isClose:true,
            },
            {
                label:"时间线",
                key: 'timeline',
                icon:History24Regular,
                parendKey:"other",
                component: timeline,
                isClose:true,
            },
            {
                label:"多标签",
                key: 'manyTab',
                icon:TabDesktopCopy20Regular,
                parendKey:"other",
                component: manyTab,
                isClose:true,
            },
            {
                label:"水印",
                key: 'watermark',
                icon:Drop24Regular,
                parendKey:"other",
                component: watermark,
                isClose:true,
            },
            {
                label:"分享",
                key: 'share',
                icon:ShareAndroid24Regular,
                parendKey:"other",
                component: share,
                isClose:true,
            },
            {
                label:"动态锚点",
                key: 'dynamicAnchor',
                icon:Anchor,
                parendKey:"other",
                component: dynamicAnchor,
                isClose:true,
            },
            {
                label:"动态Meta",
                key: 'dynamicMeta',
                icon:CalendarEmpty24Regular,
                component: dynamicMeta,
                renderCompoent:()=>{
                    const stroe = useStore();
                    return h(NBadge,{value:stroe.badgeValue,offset:[20,0],max:99},{})
                },
                parendKey:"other",
                isClose:true,
            },
            {
                label:"动态路径参数",
                key: 'dynamicParams',
                parendKey:"other",
                icon:ArrowSwap24Regular,
                children:[
                    {
                        label:"Params id=1",
                        key: 'params1',
                        parendKey:"dynamicParams",
                        component: params1,
                        isClose:true,
                        params:{
                            id:"1"
                        }
                    },
                    {
                        label:"Query id=1",
                        key: 'query1',
                        parendKey:"dynamicParams",
                        component: query1,
                        isClose:true,
                        query:{
                            id:'1',
                        }
                    }
                ]
            },
            {
                label:"拖拽",
                key: 'drag',
                parendKey:"other",
                icon:CursorHover24Regular,
                children:[
                    {
                        label:"弹窗拖拽",
                        key: 'modalDrag',
                        parendKey:"drag",
                        component: modalDrag,
                        isClose:true,
                    },
                    {
                        label:"卡片拖拽",
                        key: 'cardDrag',
                        parendKey:"drag",
                        component: cardDrag,
                        isClose:true,
                    }
                ]
            },
            {
                label:"无框",
                key: 'noLayout',
                // component: noLayout,
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
                key: 'multiRouter',
                parendKey:"other",
                children:[
                    {
                        label:"多级路由1-1",
                        key: 'multiRouter1-1',
                        parendKey:"multiRouter",
                        children:[
                            {
                                label:"多级路由1-1-1",
                                key: 'multiRouter1-1-1',
                                parendKey:"multiRouter1-1",
                                children:[
                                    {
                                        label:"多级路由1-1-1-1",
                                        key: 'multiRouter1-1-1-1',
                                        parendKey:"multiRouter1-1-1",
                                        component:multiRouter,
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
                key: 'jump',
                jumpUrl:"https://github.com/wushijiang13",
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
                        key: 'search360',
                        parendKey:"iframe",
                        component: search360,
                        isClose:true,
                    },
                    {
                        label:"哔哩哔哩",
                        key: 'bilibili',
                        parendKey:"iframe",
                        component: bilibili,
                        isClose:true,
                    },
                    {
                        label:"自定义iframe",
                        key: 'customIframe',
                        parendKey:"iframe",
                        component: customIframe,
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
]);

export function updateExpandIcon(key:string,expand:Function){
    if(key == ''){
        return;
    }
    let targetIndex: number;
    menuOption.value.find((item:menuOptions,index:number)=>{
        if(item.key == key){
            targetIndex = index;
            return true;
        }
    })
    menuOption.value[targetIndex]['expand'] = expand;
}

