<script setup lang="ts">
  import {setLocalData} from '@utils'
  document.title=import.meta.env.VITE_TITLE;
</script>

<template>
    <div>
        <router-view/>
    </div>
</template>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #dddddd;
}

::-webkit-scrollbar-thumb:hover {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  border-radius: 5px;
  background: #00000000;
}
</style>
