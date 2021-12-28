<template>
    <div class="layout-teambition">
        <div class="layout-navigation">

        </div>
        <div class="layout-main">
            <div class="layout-inherit-flex-box">
                <div class="layout-header">

                </div>
            </div>
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

    .layout-teambition{
        display: flex;
    }
    .layout-navigation{
        width: 80px;
        box-shadow: 0 0px 5px 1px rgb(57 66 60 / 20%);
        height: 100vh;
        margin-right: 2px;
        display: inline-flex;
    }
    .layout-main{
        display: inline-flex;
        flex: 1;
        background-color: #f8f8f8;
        flex-direction: column;
    }
    .layout-header{
        flex:1;
        height: 60px;
        box-shadow: 0 1px 5px 0 rgb(57 66 60 / 20%);
        display: inline-flex;
        background-color: #fff;
    }
    .laout-content{
        padding: 20px;
    }
</style>