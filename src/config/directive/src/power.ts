// @ts-ignore
import store from "@/config/store/index";
import { Directive, nextTick } from "vue";
const directive: Directive = {
  mounted(el, { value }) {
    nextTick(() => {
      const status = store.getters.getPower(value);
      if (status) return;
      el.parentNode && el.parentNode.removeChild(el);
    });
  }
};

export default {
  name: "permissions",
  ...directive
};
