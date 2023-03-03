import { h, reactive, ref } from "vue";
import type { Ref } from "vue";
import { NSwitch,NButton,NInput } from "naive-ui";

let isShowUpdateTable = ref(false);

function createCols () {
    return [
        {
            type: 'selection',
        },
        {
            title: '开启/关闭',
            key: 'switch',
            render(){
                return h(
                    NSwitch,
                    {
                        modelValue:active,
                    },
                    {}
                )
            },
        },
        {
            title: 'Name',
            key: 'name',
            ellipsis:true,
            render:(row)=>{
                if(row.isShowUpdate){
                    return h(NInput, {
                        value: row.name,
                        onUpdateValue (v) {
                            row.name = v
                        },
                        size:'small'
                    })
                }else{
                    return h('span', row.name)
                }
            }
        },
        {
            title: 'physicsAttack',
            key: 'physicsAttack',
            ellipsis:true,
            fixed:true,
        },
        {
            title: 'magicAttack',
            key: 'magicAttack',
            ellipsis:true,
            fixed:true,
        },
        {
            title: 'operate',
            key: 'operate',
            ellipsis:true,
            render:(row:any)=>{
                if(row.isShowUpdate){
                    return h(NButton,{
                        size:"small",
                        type:"success",
                        onClick:()=>submitUpdate(row),
                    },{default:()=>"保存"})
                }
                return h(NButton,{
                    size:"small",
                    onClick:()=>showUpdate(row),
                },{default:()=>"编辑"})
            }
        },
    ]
}
function showUpdate(row:any){
    row['isShowUpdate'] = true;
}
function submitUpdate(row:any){
    row['isShowUpdate'] = false;

}
function createData () {
    return Array.apply(null, Array(50)).map((_, i) => {
        return {
            key: i,
            name: `name_${i}`,
            physicsAttack: `哈哈哈${i}`,
            magicAttack: `magicAttack_${i}`,
            defend: `defend_${i}`,
            speed: `speed_${i}`,
        }
    })
}

export let data = ref(createData());
export let columns= ref(createCols());
export let checkedRowKeysRef:Ref<Object[]> = ref([]);
export let active = ref(false);
export const pagination= reactive({
    page:1,
    pageSize: 10,
    showQuickJumper:true,
    pageSizes:[10, 20, 30, 40],
    itemCount:data.value.length,
    showSizePicker:true,
    onUpdatePageSize: (pageSize:number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
    },
    onChange: (page:number) => {
        pagination.page = page
    },
})
export const selectData=[
    {
        label: "不限",
        value: 'song0',
    },
    {
        label: '很多',
        value: 'song1'
    },
    {
        label: '很多多',
        value: 'song2'
    },
]
export const checkedRowKeys = ref([]);
export const config = reactive({
    tableOption:{
        "data":data,
        'columns':columns,
        'single-line':false,
        pagination:pagination,
        checkedRowKeys:checkedRowKeys,
    },
    paginationOption:pagination,
    moduleColOptions:{
        search:{
            isShow:true,
            code:"search",
            placeholder:'搜索用户名',
            value:'',
        },
        down:{
            isShow:false,
            code:"down",
        },
        filter:{
            isShow:false,
            code:"filter",
        },
        custom:{
            isShow:false,
            code:'custom',
        },
        add:{
            isShow:false,
            code:"add",
        }
    },
    selectOptions:[
        {
            options:{
                label:'计划',
                value:'',
                type:"text",
                placeholder:"计划ID或者关键字",
            },
            defaultValue:{
                value: '',
            },
        },
        {
            options:{
                label:'推广id',
                value:'song0',
                type:"select",
                options:selectData,
                placeholder:"请选择推广id",
            },
            defaultValue:{
                label: "不限",
                value: 'song0',
            },
        },
        {
            options:{
                label:'订单时间',
                value:null,
                type:"datetime",
                placeholder:"请选择订单时间",
            },
            defaultValue:{
                value: null,
            },
        },
        {
            options:{
                label:'创意名称',
                value:'',
                type:"text",
                placeholder:"创意ID或者关键字",
            },
            defaultValue:{
                value: '',
            },
        },
    ],
})