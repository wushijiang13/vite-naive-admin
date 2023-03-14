import { app }  from "@/config/vue/app";
import { useStore } from "@pinia";
app.config.globalProperties.$permissions = (code: string[] | string) => {
   const store = useStore();
   return store.getPower(code);
};

