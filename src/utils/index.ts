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


export {
    downLoadFile,
    isNullCheck,
    setLocalData,
    getLocalData
}