import { h, reactive, ref } from "vue";
import type { Ref } from "vue";
import { NSwitch } from "naive-ui";

function createCols () {
    return [
        {
            type: 'selection',
            options: [
                'all',
                'none',
                {
                    label: '选中前 2 行',
                    key: 'f2',
                    onSelect: (pageData:Object[]) => {
                        checkedRowKeysRef.value = pageData
                            .map((row:any) => row.key)
                            .slice(0, 2)
                    }
                }
            ],
            disabled (row:any) {
                return row.name === 'Edward King 3'
            },
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
            title: 'defend',
            key: 'defend',
            ellipsis:true,
            fixed:false,
        },
        {
            title: 'speed',
            key: 'speed',
            ellipsis:true,
            fixed:false,
        }
    ]
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
            placeholder:'推广id或者用户名',
            value:'',
        },
        down:{
            isShow:true,
            code:"down",
        },
        filter:{
            isShow:true,
            code:"filter",
        },
        custom:{
            isShow:true,
            code:'custom',
        },
        add:{
            isShow:true,
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