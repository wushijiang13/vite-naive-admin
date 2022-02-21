// 小数点后两位自定义指令
import { Directive } from "vue";
const findEle = (parent: any, type: string) => {
  return parent.tagName.toLowerCase() === type
    ? parent
    : parent.querySelector(type);
};
const trigger = (el: any, type: string) => {
  // 给元素绑定事件
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};
const amount: Directive = {
  mounted(el, binding) {
    // 正则规则可根据需求自定义
    let $inp = findEle(el, "input") || findEle(el, "textarea"); // 判断绑定元素是否是input输入框或者富文本输入框
    el.$inp = $inp;
    $inp.handle = function() {
      let val = $inp.value;
      if (binding.value) {
        $inp.value = val.replace(/[^1-9]/g, "");
      } else {
        // $inp.value = val.match(/^\d*(.?\d{0,2})/g)[0] || null;
        $inp.value = val.replace(/[^\d^.]+/g, "");
      }
      trigger($inp, "input");
    };
    $inp.addEventListener("blur", $inp.handle); // el添加键盘失焦事件blur
  }
};

export default {
  name: "amount",
  ...amount
};
