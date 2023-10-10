import { cloneDeep } from 'lodash'
/**
 * 此工具类 为了方便以后使用，只写一次，整体项目如有需要 所有工具或简化函数添加此处
 * 用处：将融合进loadsh 和 自定义函数导出新的loadsh 对象以供使用
 */

/**
 * 是否为null字符的判断
 * return true 正确不等于空 false 空
 */

const isNullCheck = (value:any) => {
    if(value == null && value == undefined && value == ''){
        return false;
    }
    return true;
}

const setLocalData = (name="",value="") => {
    localStorage.setItem(name, JSON.stringify(value));
}

const getLocalData = (name="") => {
    return localStorage.getItem(name) ? JSON.parse(<string>localStorage.getItem(name)) : "";
}

/**
 * 下载文件专用函数
 * @param url 下载地址
 * @param name  生成的文件名 需要携带文件类型后缀
 */
const downLoadFile = (url = "", name = "文件") => {
    try {
        console.log(url);
        const a = document.createElement("a"); // 创建a标签
        a.setAttribute("download", name); // download属性
        a.setAttribute("href", url); // href链接
        a.click(); // 自执行点击事件
    } catch (e) {
        console.log("下载失败");
    }
};
/**
 * 根据传入的key和name比对并删除目标中的这个对象
 * @param targetList 目标数组
 * @param key 用于目标数组遍历的key
 * @param name 外部条件
 * @retrun 删除成功或者没有找到返回已操作的数组， key或者目标参数为空返回空数组
 */
const getKeyFindDelete = (targetList:any[],key:string,name:string|number) =>{
    if(targetList.length == 0 || name == ''){
        return [];
    }
    let targetIndex;
    if(key == ''){
        targetIndex = targetList.findIndex((item:string)=>item == name)
    }else {
        targetIndex = targetList.findIndex((item:string)=>item[key] == name)
    }
    if(targetIndex != -1){
        targetList.splice(targetIndex,1);
    }
    return targetList;
}

/**
 * 拷贝合并器
 * 对象比较合并 以第一个参数为主,如果有相同第二个对象属性会覆盖
 * @params defaultInfo 默认参数
 * @params propsInfo 更新参数
 * @waring 如果两个参数不一致最后会合并成 第一个参数的属性长度，但是参数值以新值为主，后值为辅
 */
function mergeAssign(defaultInfo,propsInfo) {
    let keyList = Object.keys(defaultInfo);
    keyList.forEach(item =>{
        if (propsInfo.hasOwnProperty(item)) {
            if(Object.prototype.toString.call(defaultInfo[item]) == Object.prototype.toString.call(propsInfo[item])){
                if(Object.prototype.toString.call(defaultInfo[item]).includes('Object')){
                    propsInfo[item] = Object.assign(defaultInfo[item],propsInfo[item]);
                }
            }else{
                if(!Object.prototype.toString.call(defaultInfo[item]).includes('Object')){
                    if(propsInfo[item] != undefined){
                        return;
                    }
                    propsInfo[item] = cloneDeep(defaultInfo[item]);
                }
            }
        }
    })
    return propsInfo;
}

/**
 * 随机生成16进制颜色
 */
function randomGenerateColor(){
    let base16Map = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    let base16Color = `#`;
    for (let i = 0; i < 6; i++) {
        let randIndex = Math.floor(Math.random()* 15);
        base16Color += base16Map[randIndex];
    }
    return base16Color;
}

export {
    downLoadFile,
    isNullCheck,
    setLocalData,
    getLocalData,
    getKeyFindDelete,
    mergeAssign,
    randomGenerateColor
}