import { Directive, nextTick } from "vue";
// 防止重复提交指令
const preventReClick: Directive = {
  mounted(el, { value }) {
    nextTick(() => {
      el.addEventListener("click", () => {
        if (!el.disabled) {
          el.disabled = true;
          setTimeout(() => {
            el.disabled = false;
          }, value || 2000);
        }
      });
    });
  }
};

export default {
  name: "preventReClick",
  ...preventReClick
};
