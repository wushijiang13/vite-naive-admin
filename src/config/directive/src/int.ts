// 整数自定义指令
import { Directive } from "vue";
// 禁止输入特殊符号和表情
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
//加入传参字符串 范围验证
//如 '1,100'验证的就是必须是1,100的 值才保存.
const intNumber: Directive = {
  mounted(el, binding) {
    // 正则规则可根据需求自定义
    let $inp = findEle(el, "input") || findEle(el, "textarea"); // 判断绑定元素是否是input输入框或者富文本输入框
    el.$inp = $inp;
    $inp.handle = function() {
      let val = $inp.value;
      if (binding.value && typeof binding.value == "string") {
        $inp.value = val.replace(/[^0-9]/g, "");
        const numberScope = binding.value.split(",");
        if (numberScope.length == 2) {
          $inp.value =
            $inp.value < Number(numberScope[0]) ||
            $inp.value > Number(numberScope[1])
              ? ""
              : $inp.value;
        } else {
          $inp.value = val.replace(/[^1-9]/g, "");
        }
      } else {
        $inp.value = val.replace(/[^\d]/g, "");
      }
      trigger($inp, "input");
    };
    $inp.addEventListener("blur", $inp.handle); // el添加键盘失焦事件blur
  }
};

export default {
  name: "intNumber",
  ...intNumber
};
