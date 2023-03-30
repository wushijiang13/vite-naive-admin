/***
 * 主题配置存储
 */
import layoutTeambition from '@/components/layout/src/layout-teambition.vue'
import layoutTop from '@/components/layout/src/layout-top.vue'
import layoutConventional from '@/components/layout/src/layout-conventional.vue'
import layoutSandwich from '@/components/layout/src/layout-sandwich.vue'
import type { LayoutOption,LayoutMap } from '@types'

export const layoutList: LayoutOption[] = [
    {
        label: "常规布局",
        key: "conventional",
        value: layoutConventional
    },
    {
        label: "房间布局",
        key: "top",
        value: layoutTop,
    },
    {
        label: "三明治布局",
        key: "layoutSandwich",
        value: layoutSandwich
    },
    {
        label: "TB布局",
        key: "teambition",
        value: layoutTeambition,
    }
]

export let layoutMap:LayoutMap = {};

layoutList.forEach(item=>{
    layoutMap[item.key] = item;
})

console.log(layoutMap['top']);
export const themeConfigDeep = {
    layoutValue:layoutMap['top'],//布局值
    themeColorValue:"dark",//全局深浅主题是否启动 dark 为深色 white 为白色
}




