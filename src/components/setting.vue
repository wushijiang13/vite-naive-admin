<!--设置-->
<template>
    <div class="setting">
        <n-popover trigger="click">
            <template #trigger>
                <n-button type="success" style="font-size: 20px;">
                    <n-icon>
                        <Settings/>
                    </n-icon>
                </n-button>
            </template>
            <div class="setting-popover">
                <h3>主题更换</h3>
                <h4>布局更换</h4>
                <n-space vertical>
                  <n-radio-group
                            v-model:value="selectLayout"
                            name="radiobuttongroup1">
                    <n-grid x-gap="12" :cols="2">
                        <n-gi
                                v-for="layout in layoutList"
                                :key="layout.key"
                        >
                            <n-radio-button
                                    :key="layout.key"
                                    :value="layout.key">
                                {{ layout.label }}
                            </n-radio-button>
                        </n-gi>
                    </n-grid>
                    </n-radio-group>
                </n-space>
            </div>
        </n-popover>
    </div>
</template>

<script setup lang="ts">
    import layoutTeambition from '@/page/layout/layout-teambition.vue'
    import layoutTop from '@/page/layout/layout-top.vue'
    import layoutConventional from '@/page/layout/layout-conventional.vue'
    import layoutFullScreen from '@/page/layout/layout-full-screen.vue'
    import layoutSandwich from '@/page/layout/layout-sandwich.vue'
    import layoutDrag from '@/page/layout/layout-drag.vue'
    import {Settings} from '@vicons/ionicons5';
    import {reactive, ref, watch, defineEmits, defineProps, onMounted} from 'vue'

    defineProps(['modelValue'])
    const emits = defineEmits(['update:modelValue'])

    const layoutList = {
        "teambition": {
            label: "TB布局",
            key: "teambition",
            value: layoutTeambition,
        },
        "top": {
            label: "房间布局",
            key: "top",
            value: layoutTop,
        },
        "conventional": {
            label: "常规布局",
            key: "conventional",
            value: layoutConventional
        },
        "layoutFullScreen": {
            label: "全屏布局",
            key: "layoutFullScreen",
            value: layoutFullScreen
        },
        "layoutSandwich": {
            label: "三明治布局",
            key: "layoutSandwich",
            value: layoutSandwich
        },
    };

    let selectLayout = ref(layoutList.teambition.key);

    onMounted(()=>{
        console.log(selectLayout);
        emits('update:modelValue', layoutList[selectLayout.value]);
    })

    watch(
        () => selectLayout.value,
        (newValue) => {
            emits('update:modelValue', layoutList[newValue]);
        }
    )


</script>

<style scoped>
    .setting {
        position: absolute;
        right: 20px;
        bottom: 50px;
    }

    .setting-popover {
        width: 200px;
    }
</style>