import {
    create,
    // component
    NButton,
    NPopover,
    NIcon,
    NRadio,
    NCard,
    NSpace,
    NRadioGroup,
    NRadioButton,
    NGrid,
    NGridItem,
    NMenu,
    NSwitch,
    NDataTable,
    NLayout,
    NLayoutSider,
    NBreadcrumb,
    NBreadcrumbItem
} from 'naive-ui'

const naive = create({
    components: [NButton,NPopover,NIcon,NRadio,NCard,NSpace,NRadioGroup,
        NRadioButton,NGrid,NGridItem,NMenu,NBreadcrumb,NBreadcrumbItem,
        NSwitch,NLayout, NLayoutSider,NDataTable]
})
export {naive}
