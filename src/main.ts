import {app}  from "@/config/vue/app";
import {naive} from '@/config/ui/index.ts'
import {routerObject} from '@/config/router/router.ts'

app.use(naive)
    .use(routerObject)
    .mount('#app')
