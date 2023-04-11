<script setup lang="ts">
  document.title=import.meta.env.VITE_TITLE;
</script>

<template>
  <n-loading-bar-provider>
    <div>
        <router-view/>
    </div>
  </n-loading-bar-provider>
</template>
