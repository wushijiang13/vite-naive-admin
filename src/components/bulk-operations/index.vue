<template>
  <div>
    <div v-if="isShow" class="bulk-operations">
        <div class="bluk-left-box">
          已选择<span class="bluk-count">{{data.length}}</span>项
          <div class="bluk-module">
            <div v-for="item in moduleList" class="bluk-item">
              <n-button v-if="item.code" text class="bluk-btn" @click="bulkOperations(item)">
                <n-icon>
                  <component :is="item.icon"></component>
                </n-icon>
                &nbsp;{{item.label}}
              </n-button>
            </div>
          </div>
        </div>
        <div class="bluk-right-box">
          <n-button @click="closeClick('closeClick')"  text  class="bluk-close-btn" >
            <n-icon><CloseOutline/></n-icon>
          </n-button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CloseOutline } from '@vicons/ionicons5'
  import { ref,reactive,defineEmits,defineProps,watch,onMounted} from 'vue'
  import { useBulk } from './config/config'
  const emits = defineEmits(['deleteClickOk','closeClick'])
  const { data , options } = defineProps(['data','options']);
  let moduleList = useBulk(options)

  const isShow = ref(false);

  const bulkOperations = (item)=>{
    emits(item.emitsKey,data)
  }

  const closeClick = (emitsKey:string) => {
    data.value = [];
    emits(emitsKey,data)
  }

  watch(
      () => data.value,
      val => {
        isShow.value = data.value.length > 0 ;
      },
  )

</script>

<style>
  .bulk-operations{
    position: fixed;
    bottom: 80px;
    width: calc(100vw - 260px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bluk-left-box{
    height: 52px;
    border-radius: 50px;
    padding: 0px 40px;
    box-shadow: var(--theme-box-shadow);
    line-height: 52px;
    background-color: #fff;
  }
  .bluk-right-box{
    height: 52px;
    width: 52px;
    border-radius: 50%;
    margin-left: 20px;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--theme-box-shadow);
    background-color: #fff;
  }
  .bluk-close-btn{
    font-size: 30px;
    vertical-align: middle;
  }
  .bluk-module{
    margin-left: 20px;
    display: inline-flex;
    vertical-align: middle;
  }
  .bluk-item{
    line-height: 52px;
    display: inline-block;
    vertical-align: middle;
  }
  .bluk-btn{
    font-size: 14px;
    font-weight: 600;
    color: #000000;
  }
  .bluk-count{
    color: var(--theme-color);
    font-weight: 600;
    font-size: 15px;
  }

</style>