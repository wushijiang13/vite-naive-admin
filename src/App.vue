<script setup lang="ts">
  document.title=import.meta.env.VITE_TITLE;
</script>

<template>
  <n-loading-bar-provider>
    <n-notification-provider>
    <div>
        <router-view/>
    </div>
    </n-notification-provider>
  </n-loading-bar-provider>
</template>
