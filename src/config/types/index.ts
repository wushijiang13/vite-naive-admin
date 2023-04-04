import { ComponentOptions , DefineComponent} from "vue";

/**
 * 面包屑
 */
export interface menuOptions{
    label:string,
    key:string,
    component?:any,
    parendKey?:string,
    icon?:any,
    disabled?:boolean,
    children?:menuOptions[],
    isClose?:boolean
}

export interface LayoutOption {
    label:string,
    key:string,
    value: ComponentOptions | DefineComponent,
}

export interface LayoutMap {
    [key: string]: LayoutOption;
}

export interface ThemeConfig {
    layoutValue:LayoutOption,
    themeColorValue:string,
}