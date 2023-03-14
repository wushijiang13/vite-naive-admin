import {app}  from "@/config/vue/app";
import '@/config/directive'
import '@/config/global/permissions'
import {naive} from '@/config/ui/index'
import {router} from '@/config/router/router'
import { createPinia } from 'pinia'
import '@/config/css/theme.css'

const pinia = createPinia();

app.use(naive)
   .use(router)
   .use(pinia)
   .mount('#app')
