<template>
  <div class="desc">
    <n-descriptions label-placement="top">
      <template #header>
        <h3 class="title">描述</h3>
      </template>
      <n-descriptions-item>
        <template #label>
          早餐
        </template>
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="早午餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="午餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="晚餐" :span="2">
        两个<br>
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="夜宵">
        <n-tag type="info">
          不吃减肥
        </n-tag>
      </n-descriptions-item>
    </n-descriptions>
    <n-descriptions label-placement="top" bordered>
      <template #header>
        <h3 class="title">带边框描述</h3>
      </template>
      <n-descriptions-item>
        <template #label>
          早餐
        </template>
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="早午餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="午餐">
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="晚餐" :span="2">
        两个<br>
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="夜宵">
        <n-tag type="info">
          不吃减肥
        </n-tag>
      </n-descriptions-item>
    </n-descriptions>
  </div>
  <div>
    <h2 class="title">段落</h2>
    <n-tag type="info">
      沁园春·雪
    </n-tag>
  </div>
  <n-p>
    北国风光，千里冰封，万里雪飘。
    望长城内外，惟余莽莽；大河上下，顿失滔滔。
    山舞银蛇，原驰蜡象，欲与天公试比高。
    须晴日，看红装素裹，分外妖娆。
    江山如此多娇，引无数英雄竞折腰。
    惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。
    一代天骄，成吉思汗，只识弯弓射大雕。
    俱往矣，数风流人物，还看今朝。
  </n-p>
  <n-space vertical>
    <div>
      <n-space align="center">
        <h2 class="title">手风琴</h2>
        <n-switch v-model:value="show">
          <template #checked>
            展开
          </template>
          <template #unchecked>
            折叠
          </template>
        </n-switch>
      </n-space>
    </div>
    <n-collapse-transition :show="show">
      感知度，方法论，组合拳，引爆点，点线面，精细化，差异化，平台化，结构化，影响力，耦合性，便捷性，一致性，端到端，短平快，护城河，体验感，颗粒度
    </n-collapse-transition>
  </n-space>
</template>

<script setup lang="ts">
  import {ref} from "vue";

  const show = ref(true);
</script>

<style scoped>
.title{
  height: 20px;
  line-height: 20px;
}
.title::before{
  content: "";
  background-color: var(--theme-color);
  width: 6px;
  height: 20px;
  display: inline-flex;
  vertical-align: top;
  margin-right: 10px;
}
</style>