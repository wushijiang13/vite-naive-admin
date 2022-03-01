参数调用:  
## tableOption 表格配置

|  参数名   | 类型  |  默认值   |  说明  |
|  ----  | ----  |  ----  | ----  |
| data  | object  | object  | 表格源数据 |
| columns  | object | object  | 表头配置 |
| pagination  | object | object  | 分页配置 |  

[table 详细配置](https://www.naiveui.com/zh-CN/light/components/data-table)

## moduleColOptions 功能模块配置

|  参数名   | 类型  |  默认值   |  说明  |
|  ----  | ----  |  ----  | ----  |
| down  | object()=> {isShow:true,code:"down"}  | {isShow:false,code:""}  | 选填,用于控制下载模块是否显示 |
| refresh  | object()=> {isShow:true,code:"refresh"} |{isShow:false,code:""}  | 选填,用于控制刷新模块是否显示 |
| filter  | object()=> {isShow:true,code:"filter"} | {isShow:false,code:""}  | 选填,用于控制筛选模块是否显示 |  
| custom  | object()=> {isShow:true,code:"custom"} | {isShow:false,code:""}  | 选填,用于控制自定义列模块是否显示 |  
| search  | object()=> {isShow:true,code:"custom",placeholder:'',value:'} | {isShow:false,code:"",placeholder:'',value:''}  | 选填,用于控制搜索模块是否显示 |  

## moduleColOptions childrenOption 功能模块内部配置

|  参数名   | 类型  |  默认值   |  说明  |
|  ----  | ----  |  ----  | ----  |
| isShow  | boolean  | false  | 选填,用于控制模块是否显示 |
| code  | string | '' | 选填,用于判断当前用户权限是否包含此模块 |
| placeholder  | string | '' | 选填,只有搜索模块需要用到此值，其他模块不需要穿此值 |
| value  | string | '' | 选填,只有搜索模块需要用到此值，其他模块不需要穿此值 |

## selectOptions array 筛选配置 整个值可以不填，但是如果设置了 筛选模块展示此值为必填

|  参数名   | 类型  |  默认值   |  说明  |
|  ----  | ----  |  ----  | ----  |
| options  | object()=> {label:'',value:'',type:"",placeholder:"",}  | 无  | 必传,用于配置筛选 内部生成不同组件标签 type类型 根据 ui库自身来支持的type进行生成 select 则就是'select' （'text' | 'password' | 'textarea' |'date' | 'datetime' | 'daterange' | 'datetimerange' | 'month' | 'year' | 'quarter'） |
| defaultValue  | object()=> {label: "",value: ''} | 无  | 必传,绑定默认该组件的默认值 |

## methods 方法回调

``` js
/**
     * 自定义列选择完成
     */
    const customClickOk = (status) => {
      console.log("自定义列选择完成",status);
    }
    /**
     * tag 发生修改后
     */
    const searchTagChange = (item,selectOptions) => {
      console.log("搜索tag发生改变后",item, selectOptions);
    }
    /**
     * 清空
     * @param selectOptions
     */
    const searchClearClick = (selectOptions) => {
      console.log("清空",selectOptions);
    }
    /**
     * tag 某一个的清空回调
     * @param selectOptions
     */
    const searchTagClose = (selectOptions) => {
      console.log("tag单个关闭",selectOptions);
    }
    const customClickCancel = (option) => {
      console.log("自定义列点击关闭",option);
    }
    const filterClickOK = (selectOptions) => {
      console.log("筛选点击确认",selectOptions);
    }
    const filterClickCancel = (selectOptions) => {
      console.log("筛选点击关闭",selectOptions);
    }
    const downClick = () => {
      console.log("点击下载");
    }
    const refreshClick = () => {
      console.log("点击刷新");
    }
    const searchInputChange = (value,selectOptions) => {
      console.log("搜索后执行",value,selectOptions);
    }
```
## 思路
该组件 内部不加入任何请求方法的执行，将二次封装的组件只做展示

当操作必要的筛选项时，需向外暴露回调函数。

如果使用插槽时，同时方法也会在外面，保证 请求函数 一直在父组件可以调用

另外 由于分页需要独立使用，并且进行封装所以，需要传入tableOption > pagination
和 paginationOption 都需要传入相同配置分页, 才生效,组件内部会隐藏table 自带的分页,使用自己封装的分页

现在属于 权限判断还没加，分页和新增和批量操作都悬浮在底下。