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
    NBreadcrumbItem,
    NDrawer,
    NDrawerContent,
    NConfigProvider,
    NInput,
    NSelect,
    NDatePicker,
    NTag,
    NCheckboxGroup,
    NCheckbox,
    NAffix,
    NPagination,
    NTabs,
    NTabPane
} from 'naive-ui'

const naive = create({
    components: [NButton,NPopover,NIcon,NRadio,NCard,NSpace,NRadioGroup,
        NRadioButton,NGrid,NGridItem,NMenu,NBreadcrumb,NBreadcrumbItem,NDrawer,
        NDrawerContent,NConfigProvider,NInput,NSelect,NDatePicker,NTag,NSwitch,
        NCheckboxGroup,NCheckbox,NAffix,NPagination,
        NSwitch,NLayout, NLayoutSider,NDataTable,NTabs,NTabPane]
})
export {naive}
