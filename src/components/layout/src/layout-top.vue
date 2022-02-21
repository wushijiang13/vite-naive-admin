<!--房间布局-->
<template>
    <div class="layout-top">
        <div class="layout-header">
            <h1>
                运营支撑后台
            </h1>

        </div>
        <div class="layout-navigation">

        </div>
        <div class="layout-main">
            <div class="laout-content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .layout-inherit-flex-box{
        display: flex;
    }
    .layout-top{
        display: flex;
        flex-direction: column;
    }
    .layout-header{
        height: 70px;
        padding: 0px 20px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
    }
    .layout-navigation{
        width: 100%;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        height: 50px;
    }
    .layout-main{
        height: calc(100vh - 126px);
        margin-top: 3px;
    }
    .laout-content{
        padding: 20px;
        width: 90%;
        margin: 0px auto;
    }
</style>