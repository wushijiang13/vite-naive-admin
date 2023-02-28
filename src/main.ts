import {app}  from "@/config/vue/app";
import '@/config/directive'
import '@/config/global/permissions'
import {naive} from '@/config/ui/index'
import {router} from '@/config/router/router'
import store from '@/config/store/index'
import '@/config/css/theme.css'

app.use(naive)
   .use(router)
   .use(store)
   .mount('#app')
