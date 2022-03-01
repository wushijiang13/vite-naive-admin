import _ from 'lodash'
import { ref } from 'vue';
import { Delete24Regular } from "@vicons/fluent";
/**
 * 初始化获取配置
 * 用于做兜底判断保证参数传参的简化性
 */
export function useBulk(options){
    const moduleSource = ref([{
        icon:Delete24Regular,
        label:"删除",
        key:'delete',
        emitsKey:'deleteClickOk',
    }]);
    const moduleList = ref([]);
    if (_.isEmpty(options)){
        return moduleList;
    }
    moduleSource.value.forEach(item=>{
        if (options.hasOwnProperty(item.key)) {
            moduleList.value.push(Object.assign(item,options[item.key]));
        }
    })
    return moduleList;
}