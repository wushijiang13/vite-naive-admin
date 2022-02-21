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
const emoji: Directive = {
  mounted(el, binding) {
    // 正则规则可根据需求自定义
    let $inp = findEle(el, "input") || findEle(el, "textarea"); // 判断绑定元素是否是input输入框或者富文本输入框
    el.$inp = $inp;
    let emojiRules = /(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g;
    let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
    $inp.handle = function() {
      let val = $inp.value;
      if (binding.value) {
        $inp.value = val.replace(emojiRules, "");
      } else {
        $inp.value = val.replace(pattern, "").replace(emojiRules, "");
      }
      trigger($inp, "input");
    };
    $inp.addEventListener("keyup", $inp.handle); // el添加键盘监听事件keyup
    $inp.addEventListener("blur", $inp.handle); // el添加键盘失焦事件blur
  },
  unmounted(el: any) {
    // 只调用一次，指令与元素解绑时调用。
    el.$inp.removeEventListener("keyup", el.$inp.handle);
    el.$inp.removeEventListener("blur", el.$inp.handle);
  }
};

export default {
  name: "emoji",
  ...emoji
};
