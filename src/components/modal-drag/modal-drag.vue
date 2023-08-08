<template>
  <div>
    <div class="mask-box" ref="maskRef" v-show="props.show" @mousemove="dargMove" @click="clickMask">
      <div @click.stop="()=>{}"  ref="modalRef">
        <n-card
            class="modal-box-card"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            :width="`${props.width}px`"
            :style="props.drag ? {left:`${x}`,top:`${y}`} : {}">
          <template #header>
            <div :class=" props.drag ? 'darg-card' : ''"  @mousedown="dragStart" @mouseup="dragEnd">
              <slot name="header">
                <div>
                  <n-space :align="'center'" :justify="'space-between'">
                    提示
                    <n-space :align="'center'">
                      <n-icon @click="fullScreen" class="icon-click" :size="16">
                        <ArrowExpand24Regular v-show="!isFull"/>
                        <ArrowMinimize24Regular v-show="isFull"/>
                      </n-icon>
                      <n-icon @click="closeModal" class="icon-click" :size="16"><Dismiss24Regular /></n-icon>
                    </n-space>
                  </n-space>
                </div>
              </slot>
            </div>
          </template>
          <slot name="default">
            何方可化身千亿，一树梅花一放翁
          </slot>
          <template #footer>
            <slot name="footer">
              <n-space :align="'center'" :justify="'end'">
                <n-space :align="'center'">
                  <n-button @click="NegativeClick">取消</n-button>
                  <n-button @click="PositiveClick" type="primary">确定</n-button>
                </n-space>
              </n-space>
            </slot>
          </template>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, ref, onMounted, watchEffect, nextTick} from 'vue';
const props = defineProps({
  show:{
    type:Boolean,
    default:false,
  },
  drag:{
    type:Boolean,
    default:false,
  },
  positiveText:{
    type:String,
    default:"确定",
  },
  negativeText:{
    type:String,
    default:"取消",
  },
  width:{
    type:Number,
    default:600,
  }
});
const isDrag = ref(false);
const emits = defineEmits(['update:show','NegativeClick','PositiveClick']);
const x = ref('');
const y = ref('');
const startX = ref(0);
const startY = ref(0);
const modalRef:any = ref(null);

watchEffect(()=>{
  if(props.show){
    let bodyHeight = document.body.offsetHeight;
    nextTick(()=>{
      y.value = ((bodyHeight/2)-(modalRef.value.offsetHeight/2))+"px";
    })
  }
})

const clickMask = () => {
  emits('update:show',false);
}
const dragStart = (e:any) => {
  isDrag.value = true;
  startX.value = e.layerX;
  startY.value = e.layerY;
}
const dragEnd = () => {
  isDrag.value = false;
}
const dargMove = (e:any) => {
  if(isDrag.value){
    x.value = (e.x-startX.value)+'px';
    y.value = (e.y-startY.value)+'px';
  }
}

const NegativeClick	 = () => {
  emits('update:show',false);
  emits('NegativeClick');
}
const PositiveClick	 = () => {
  emits('update:show',false);
  emits('PositiveClick');
}

onMounted(()=>{
  let bodyWidth = document.body.offsetWidth;
  x.value = (bodyWidth/2)-(props.width/2)+"px";
})
</script>
<style>
  .mask-box{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 4;
    background-color: rgba(0,0,0,0.4);
  }
  .modal-box-card{
    width: 600px;
  }
  .darg-card{
    cursor: all-scroll;
  }
</style>
