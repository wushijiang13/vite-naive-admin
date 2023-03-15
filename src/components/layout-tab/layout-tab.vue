<template>
  <div class="layout-tab">
    <n-tabs
        v-model:value="store.tabPageActive"
        type="card"
        closable
        tab-style="min-width: 80px;"
        @close="handleClose"
    >
      <n-tab-pane
          v-for="page in store.tabPageList"
          :key="page.key"
          :tab="page.label"
          :name="page.key"
          :closable="store.tabPageActive == page.key && page.isClose">
        <div class="tab-pane-box">
          <keep-alive>
              <component :is="page.component"></component>
          </keep-alive>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from "@pinia";

const store = useStore();

const name = ref('');

const handleClose = (name) => {
  console.log(name);
  store.TabPageListDelete({key:name});
}
</script>

<style scoped>
.tab-pane-box{
  padding: 20px;
  padding-bottom: 0px;
}
</style>