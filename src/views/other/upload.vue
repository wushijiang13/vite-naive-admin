<template>
  <div>
    <n-button type="primary" @click="clickShowUpload()">模拟上传</n-button>
    <n-modal
        v-model:show="showModal"
        style="width: 600px"
        :mask-closable="false"
        @update:file-list="updateFileList"
    >
      <n-card
          title="上传"
          style="width: 900px"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <template #header-extra>

        </template>
        <n-alert :show-icon="false"  type="success" style="margin-bottom: 20px">
          支持jpg、jpeg、png格式，单次可最多选择50张图片，每张不可大于2M，如果大于2M会自动为您过滤
        </n-alert>
        <n-upload
            multiple
            :file-list="fileList"
            list-type="image-card"
            :default-upload="false"
            @before-upload="beforeUpload"
            :accept="'image/png, image/jpeg'"
            :max="50">
        </n-upload>
        <template #footer>
          <n-space justify="end">
            <n-button type="info" @click="closeShowUpload">关闭</n-button>
            <n-button type="primary" @click="closeSuccessUpload">开始上传</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref,Ref } from 'vue';
  import { UploadFileInfo } from 'naive-ui'
  let showModal = ref(false);
  let fileList:Ref<UploadFileInfo[]> = ref([]);

  function closeShowUpload(){
    showModal.value = false;
  }

  function closeSuccessUpload(){
    // showModal.value = false;
  }
  function clickShowUpload(){
    showModal.value = true;
  }
  function beforeUpload(options: { file: UploadFileInfo, fileList: UploadFileInfo[] }){
    let file:any = options.file;
    if((file.file.size/1024/1024) > 2){
      return;
    }
    file.status = 'finished';
    fileList.value.push(file);
  }
</script>

<style scoped>
</style>