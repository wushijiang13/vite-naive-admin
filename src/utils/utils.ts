/**
 * 此工具类 为了方便以后使用，只写一次，整体项目如有需要 所有工具或简化函数添加此处
 * 用处：将融合进loadsh 和 自定义函数导出新的loadsh 对象以供使用
 */
/***
 *工具类
 */
let timeout : NodeJS.Timeout | null = null ;
/**
 * 是否为null字符的判断
 * return true 正确不等于空 false 空
 */
function isNullCheck(value){
    if(value!= null && value != undefined && value != ''){
        return true;
    }
    return false;
}

/***
 * 防抖
 * @param fn 需要执行的函数
 * @param error error执行的函数
 * @returns {function(...[*]=)}
 */
function debounce(fn,message){
    if(timeout != null){
        this.$message.error(message);
    }
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout=setTimeout(()=>{
        fn();
        timeout=null;
        if (timeout) {
            clearTimeout(timeout);
        }
    },300)
}


function  setLocalData (name="",value=""){
    localStorage.setItem(name, JSON.stringify(value));
}

function  getLocalData(name=""){
    return localStorage.getItem(name) ? JSON.parse(<string>localStorage.getItem(name)) : "";
}

export {
    isNullCheck,
    debounce,
    setLocalData,
    getLocalData
}