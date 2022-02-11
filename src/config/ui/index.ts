import {
    // create naive ui
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
    NConfigProvider,
    NSwitch,
    NGlobalStyle,
    NThemeEditor,
    NDataTable,
    NLayout,
    NLayoutSider
} from 'naive-ui'

const naive = create({
    components: [NButton,NPopover,NIcon,NRadio,NCard,NSpace,NRadioGroup,
        NRadioButton,NGrid,NGridItem,NMenu,NConfigProvider,NGlobalStyle,NThemeEditor,
        NSwitch,NLayout, NLayoutSider,NDataTable]
})
export {naive}
