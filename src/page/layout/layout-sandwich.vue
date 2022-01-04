<!--三明治布局-->
<template>
    <div class="layout-sandwich">
        <div class="layout-header">
        </div>
        <div class="layout-main">
            <div class="laout-content">
                <router-view/>
            </div>
        </div>
        <div class="layout-bottom">
            <div class="layout-navigation">
                <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { h } from 'vue'
    import { NIcon } from 'naive-ui'
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
            label: () =>
                h(
                    'a',
                    {
                        href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
                        target: '_blank',
                        rel: 'noopenner noreferrer'
                    },
                    '且听风吟'
                ),
            key: 'hear-the-wind-sing',
            icon: renderIcon(BookIcon)
        },
        {
            label: '1973年的弹珠玩具',
            key: 'pinball-1973',
            icon: renderIcon(BookIcon),
            disabled: true,
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
            disabled: true
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
</script>

<style scoped>
    .layout-sandwich{
        display: flex;
        flex-direction: column;
    }
    .layout-header{
        width: 100vw;
        height: 100px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
    }
    .layout-main{
        background-color: #f8f8f8;
        height: calc(100vh - 176px);
        margin-top: 3px;
        width: 100vw;
    }
    .laout-content{
        padding: 20px;
        width: 90%;
        margin: 0px auto;
    }
    .layout-bottom{
        width: 100vw;
        height: 70px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
    }
    .layout-navigation{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>