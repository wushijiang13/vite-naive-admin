import type { menuOptions } from '@types'
/**
 * 递归获取面包屑
 * @param key
 * @param item
 */
export const recursionBread = (key: string, item: menuOptions,flatList:menuOptions[],bread:menuOptions[]) => {
    bread.unshift(item);
    if (item.hasOwnProperty("parendKey")) {
        let parentItem:menuOptions | undefined =  flatList.find((findItem:menuOptions)=>{
            return item.parendKey == findItem.key;
        })
        if(parentItem){
            recursionBread(parentItem['key'],parentItem,flatList,bread);
        }
    }
}