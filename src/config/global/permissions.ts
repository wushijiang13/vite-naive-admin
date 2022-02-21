// @ts-ignore
import store from "@/config/store/index";
// @ts-ignore
import {app}  from "@/config/vue/app";
app.config.globalProperties.$permissions = (code: string[] | string) => {
   return store.getters.getPower(code);
};

