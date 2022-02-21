<script setup lang="ts">
  import {setLocalData} from '@utils'
  setLocalData("ceshi","测试");
  document.title=import.meta.env.VITE_TITLE;
</script>

<template>
    <div>
        <router-view/>
    </div>
</template>

<style>

</style>
