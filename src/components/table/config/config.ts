import _ from 'lodash'
import {reactive } from 'vue';


/**
 * 初始化获取配置
 * 用于做兜底判断保证参数传参的简化性
 */
export function useConfig(config){
    let defaultConfig:any =reactive({
        moduleColOptions : {
            search:{
                isShow:false,
                code:"",
                placeholder:'',
                value:'',
            },
            down:{
                isShow:false,
                code:"",
            },
            filter:{
                isShow:false,
                code:"",
            },
            custom:{
                isShow:false,
                code:'',
            }
        },
        paginationOption:{},
        selectOptions:[],
        tableOption:{
            checkedRowKeys:[],
        },
    })
    let keyList = Object.keys(defaultConfig);
    keyList.forEach(item =>{
        if (config.hasOwnProperty(item)) {
            config[item] = Object.assign(defaultConfig[item],config[item]);
        }
    })
    return config;
}