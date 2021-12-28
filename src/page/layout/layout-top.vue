<!--顶部布局-->
<template>
    <div class="layout-top">
        <div class="layout-header">
            <div class="layout-navigation">

            </div>
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
        width: 100vw;
        height: 120px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
    }
    .layout-navigation{
        width: 100%;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        height: 70px;
    }
    .layout-main{
        background-color: #f8f8f8;
        height: calc(100vh - 126px);
        margin-top: 3px;
        width: 100vw;
    }
    .laout-content{
        padding: 20px;
        width: 90%;
        margin: 0px auto;
    }
</style>