// @ts-ignore
import {app}  from "@/config/vue/app";
// @ts-ignore
//加载指令
import '@/config/directive'
//加载全局配置
import '@/config/global/permissions'
// @ts-ignore
import {naive} from '@/config/ui/index'
// @ts-ignore
import {router} from '@/config/router/router'
// @ts-ignore
import store from '@/config/store/index'
import '@/config/css/theme.css'

console.log(import.meta.env.VITE_API_HOST);

app.use(naive)
   .use(router)
   .use(store)
   .mount('#app')
