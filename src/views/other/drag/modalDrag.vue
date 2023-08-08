<template>
  <div class="modal-box">
    <div>
      <n-button @click="showDialog" type="primary">可拖拽弹框</n-button>
    </div>
    <div >
      <modalDrag v-model:show="showModal" :drag="true"></modalDrag>
    </div>
  </div>

</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { ArrowExpand24Regular,ArrowMinimize24Regular,Dismiss24Regular } from '@vicons/fluent';
  import  modalDrag  from '@components/modal-drag/modal-drag.vue'
  import 'vue-json-pretty/lib/styles.css'
  let showModal = ref(false);
  let isFull = ref(false);
  let x= ref('0px');
  let y= ref('0px');
  let isDrag = ref(true);
  const showDialog = () => {
    showModal.value = true;
  }
  const fullScreen = () => {
    isFull.value = !isFull.value
  }
  const closeModal = () => {
    showModal.value = false;
  }

  const dargMove = (e:any) => {
    if (isDrag.value) {
      x.value = (e.x-50)+'px';
      y.value = (e.y-50)+'px';
      console.log(e);
    }
  }

</script>
<style scoped>
  .icon-click{
    cursor: pointer;
  }
  .normal-modal{
    width: 600px;
    position: fixed;
  }
  .full-screen-modal{
    width: 100vw;
    height: 100vh;
  }
  .modal-box{
    height: 100vh;
  }
</style>