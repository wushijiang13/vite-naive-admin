<script setup lang="ts">
    import setting from '@/components/setting.vue'
    import {ref} from 'vue';
    const layoutSelectValue = ref("");

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <component :is="layoutSelectValue.value"></component>
    <setting v-model="layoutSelectValue"/>
</template>

<style>

</style>
