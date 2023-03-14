import {useStore} from "@pinia";

import { Directive, nextTick } from "vue";
const directive: Directive = {
  mounted(el, { value }) {
    nextTick(() => {
      const store = useStore();
      const status = store.getPower(value);
      if (status) return;
      el.parentNode && el.parentNode.removeChild(el);
    });
  }
};

export default {
  name: "permissions",
  ...directive
};
