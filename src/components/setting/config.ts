/***
 * 主题配置存储
 */
import layoutTeambition from '@/components/layout/src/layout-teambition.vue'
import layoutTop from '@/components/layout/src/layout-top.vue'
import layoutConventional from '@/components/layout/src/layout-conventional.vue'
import layoutSandwich from '@/components/layout/src/layout-sandwich.vue'

export const layoutList = {
    "conventional": {
        label: "常规布局",
        key: "conventional",
        value: layoutConventional
    },
    "top": {
        label: "房间布局",
        key: "top",
        value: layoutTop,
    },
    "layoutSandwich": {
        label: "三明治布局",
        key: "layoutSandwich",
        value: layoutSandwich
    },
    "teambition": {
        label: "TB布局",
        key: "teambition",
        value: layoutTeambition,
    },
};



export const themeConfigDeep = {
    layoutValue:layoutList.top,//布局值
    themeColorValue:"dark",//全局深浅主题是否启动 dark 为深色 white 为白色
}




