import {app}  from "@/config/vue/app";
import '@/config/directive'
import '@/config/global/permissions'
import {router} from '@/config/router/router'
import { createPinia } from 'pinia'
import '@/config/css/theme.css'
import '@icon-park/vue-next/styles/index.css'
import naive from 'naive-ui'
import { i18n } from '@config/i18n'

const pinia = createPinia();
app.use(naive)
   .use(router)
   .use(pinia)
   .use(i18n)
   .mount('#app')
