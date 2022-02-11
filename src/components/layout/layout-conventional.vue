<!--常规布局-->
<template>
    <div class="layout-conventional">
        <div class="layout-header">

        </div>
        <div class="layout-main">
            <div class="layout-navigation">
                <n-layout has-sider>
                    <n-layout-sider
                            bordered
                            collapse-mode="width"
                            :collapsed-width="64"
                            :width="240"
                            :collapsed="collapsed"
                            show-trigger
                            @collapse="collapsed = true"
                            @expand="collapsed = false"
                    >
                    <n-menu
                            :collapsed="collapsed"
                            :options="menuOptions"
                            :default-expanded-keys="defaultExpandedKeys"
                            :collapsed-width="64"
                            :collapsed-icon-size="22"
                            :render-icon="renderMenuIcon"
                            :expand-icon="expandIcon"
                    />
                </n-layout-sider>
                    <n-layout>
                        <div class="laout-content">
                            <router-view/>
                        </div>
                    </n-layout>
                </n-layout>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
    import { h , ref } from 'vue'
    import { NIcon } from 'naive-ui'
    import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
    import {
        BookOutline as BookIcon,
        PersonOutline as PersonIcon,
        WineOutline as WineIcon
    } from '@vicons/ionicons5'

    function renderIcon (icon) {
        return () => h(NIcon, null, { default: () => h(icon) })
    }

    const menuOptions = [
        {
            label: '且听风吟',
            key: 'hear-the-wind-sing',
            icon: renderIcon(BookIcon)
        },
        {
            label: '1973年的弹珠玩具',
            key: 'pinball-1973',
            icon: renderIcon(BookIcon),
            children: [
                {
                    label: '鼠',
                    key: 'rat'
                }
            ]
        },
        {
            label: '寻羊冒险记',
            key: 'a-wild-sheep-chase',
            icon: renderIcon(BookIcon),
        },
        {
            label: '舞，舞，舞',
            key: 'dance-dance-dance',
            icon: renderIcon(BookIcon),
            children: [
                {
                    type: 'group',
                    label: '人物',
                    key: 'people',
                    children: [
                        {
                            label: '叙事者',
                            key: 'narrator',
                            icon: renderIcon(PersonIcon)
                        },
                        {
                            label: '羊男',
                            key: 'sheep-man',
                            icon: renderIcon(PersonIcon)
                        }
                    ]
                },
                {
                    label: '饮品',
                    key: 'beverage',
                    icon: renderIcon(WineIcon),
                    children: [
                        {
                            label: '威士忌',
                            key: 'whisky'
                        }
                    ]
                },
                {
                    label: '食物',
                    key: 'food',
                    children: [
                        {
                            label: '三明治',
                            key: 'sandwich'
                        }
                    ]
                },
                {
                    label: '过去增多，未来减少',
                    key: 'the-past-increases-the-future-recedes'
                }
            ]
        }
    ]
    let collapsed = ref(true);

    const  defaultExpandedKeys = ['dance-dance-dance', 'food']
</script>

<style scoped>
    .layout-inherit-flex-box{
        display: flex;
    }

    .layout-conventional{
        display: flex;
        flex-direction: column;
    }
    .layout-header{
        height: 80px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
    }
    .layout-main{
        margin-top: 3px;
    }
    .layout-navigation{
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        padding-left: 5px;
    }
    .laout-content{
        padding: 20px;
        width: 90%;
        margin: 0px auto;
    }
</style>