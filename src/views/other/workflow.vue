<template>
  <div class="workflow">
    <n-grid x-gap="12" :cols="1" y-gap="12">
      <!-- 流程列表 -->
      <n-grid-item>
        <n-card title="工作流程">
          <template #header-extra>
            <n-space>
              <n-button type="primary" @click="handleCreate">新建流程</n-button>
              <n-select
                v-model:value="filterStatus"
                :options="statusOptions"
                placeholder="筛选状态"
                style="width: 140px"
                clearable
              />
            </n-space>
          </template>
          <n-data-table
            :columns="columns"
            :data="filteredData"
            :pagination="pagination"
            :bordered="false"
          />
        </n-card>
      </n-grid-item>

      <!-- 流程详情 -->
      <n-grid-item>
        <n-card title="流程节点详情">
          <template #header-extra>
            <n-tag :type="currentFlow.type" :bordered="false">{{ currentFlow.statusText }}</n-tag>
          </template>
          <n-timeline>
            <n-timeline-item
              v-for="(node, index) in currentFlow.nodes"
              :key="index"
              :type="node.type"
              :title="node.title"
              :time="node.time"
            >
              <template #icon>
                <n-icon :component="node.icon" :color="node.iconColor" />
              </template>
              <n-card size="small" :bordered="false" class="node-card">
                <n-descriptions label-placement="left" bordered :column="2" size="small">
                  <n-descriptions-item label="处理人">{{ node.handler }}</n-descriptions-item>
                  <n-descriptions-item label="处理时间">{{ node.time }}</n-descriptions-item>
                  <n-descriptions-item label="操作">{{ node.action }}</n-descriptions-item>
                  <n-descriptions-item label="备注">{{ node.remark }}</n-descriptions-item>
                </n-descriptions>
              </n-card>
            </n-timeline-item>
          </n-timeline>
        </n-card>
      </n-grid-item>

      <!-- 审批操作 -->
      <n-grid-item>
        <n-card title="审批操作">
          <n-form ref="approvalFormRef" :model="approvalModel" :rules="approvalRules" label-placement="left" label-width="80">
            <n-form-item label="审批结果" path="result">
              <n-radio-group v-model:value="approvalModel.result" name="result">
                <n-radio-button value="approve">同意</n-radio-button>
                <n-radio-button value="reject">驳回</n-radio-button>
                <n-radio-button value="transfer">转审</n-radio-button>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="审批意见" path="comment">
              <n-input
                v-model:value="approvalModel.comment"
                type="textarea"
                placeholder="请输入审批意见"
                :rows="3"
              />
            </n-form-item>
            <n-form-item v-if="approvalModel.result === 'transfer'" label="转审人" path="transferTo">
              <n-select
                v-model:value="approvalModel.transferTo"
                :options="transferOptions"
                placeholder="请选择转审人"
              />
            </n-form-item>
            <n-form-item>
              <n-space>
                <n-button type="primary" @click="handleApproval">提交</n-button>
                <n-button @click="handleResetApproval">重置</n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- 新建流程弹窗 -->
    <n-modal v-model:show="showCreateModal" preset="dialog" title="新建工作流程" positive-text="确认" negative-text="取消" @positive-click="handleCreateConfirm">
      <n-form :model="createModel" label-placement="left" label-width="80">
        <n-form-item label="流程名称">
          <n-input v-model:value="createModel.name" placeholder="请输入流程名称" />
        </n-form-item>
        <n-form-item label="流程类型">
          <n-select v-model:value="createModel.type" :options="flowTypeOptions" placeholder="请选择流程类型" />
        </n-form-item>
        <n-form-item label="紧急程度">
          <n-radio-group v-model:value="createModel.urgency" name="urgency">
            <n-radio value="normal">普通</n-radio>
            <n-radio value="urgent">紧急</n-radio>
            <n-radio value="very-urgent">特急</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="流程描述">
          <n-input v-model:value="createModel.description" type="textarea" placeholder="请输入流程描述" :rows="3" />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from "vue";
import { NButton, NSpace, NTag, useMessage } from "naive-ui";
import {
  CheckmarkCircleOutline,
  CloseCircleOutline,
  TimeOutline,
  PersonOutline,
  ArrowForwardOutline,
} from "@vicons/ionicons5";

const message = useMessage();
const filterStatus = ref(null);
const showCreateModal = ref(false);
const approvalFormRef = ref<any>(null);

// 状态筛选选项
const statusOptions = [
  { label: "进行中", value: "running" },
  { label: "已完成", value: "completed" },
  { label: "已驳回", value: "rejected" },
  { label: "待审批", value: "pending" },
];

// 流程类型选项
const flowTypeOptions = [
  { label: "请假审批", value: "leave" },
  { label: "采购审批", value: "purchase" },
  { label: "报销审批", value: "expense" },
  { label: "合同审批", value: "contract" },
];

// 转审人选项
const transferOptions = [
  { label: "张经理", value: "zhang" },
  { label: "李总监", value: "li" },
  { label: "王副总", value: "wang" },
];

// 审批表单
const approvalModel = ref({
  result: "approve",
  comment: "",
  transferTo: null,
});

const approvalRules = ref({
  result: { required: true, message: "请选择审批结果" },
  comment: { required: true, trigger: ["change", "blur"], message: "请输入审批意见" },
});

// 新建流程表单
const createModel = ref({
  name: "",
  type: null,
  urgency: "normal",
  description: "",
});

// 当前展示的流程详情
const currentFlow = ref({
  statusText: "进行中",
  type: "warning",
  nodes: [
    {
      title: "发起申请",
      type: "success",
      icon: CheckmarkCircleOutline,
      iconColor: "#18a058",
      handler: "张三",
      time: "2024-03-01 09:00",
      action: "提交请假申请",
      remark: "请假3天，事假",
    },
    {
      title: "直属领导审批",
      type: "success",
      icon: CheckmarkCircleOutline,
      iconColor: "#18a058",
      handler: "李四",
      time: "2024-03-01 10:30",
      action: "同意",
      remark: "同意请假",
    },
    {
      title: "部门经理审批",
      type: "warning",
      icon: TimeOutline,
      iconColor: "#f0a020",
      handler: "王五",
      time: "待处理",
      action: "审批中",
      remark: "",
    },
    {
      title: "人事部备案",
      type: "default",
      icon: ArrowForwardOutline,
      iconColor: "#999",
      handler: "人事部",
      time: "待处理",
      action: "待处理",
      remark: "",
    },
  ],
});

// 流程列表数据
const flowData = ref([
  {
    id: 1,
    name: "张三-请假申请",
    type: "leave",
    urgency: "normal",
    status: "running",
    creator: "张三",
    createTime: "2024-03-01 09:00",
    currentNode: "部门经理审批",
  },
  {
    id: 2,
    name: "李四-采购申请",
    type: "purchase",
    urgency: "urgent",
    status: "completed",
    creator: "李四",
    createTime: "2024-03-02 14:00",
    currentNode: "已完成",
  },
  {
    id: 3,
    name: "王五-报销申请",
    type: "expense",
    urgency: "normal",
    status: "rejected",
    creator: "王五",
    createTime: "2024-03-03 11:00",
    currentNode: "已驳回",
  },
  {
    id: 4,
    name: "赵六-合同审批",
    type: "contract",
    urgency: "very-urgent",
    status: "pending",
    creator: "赵六",
    createTime: "2024-03-04 08:30",
    currentNode: "待审批",
  },
  {
    id: 5,
    name: "孙七-请假申请",
    type: "leave",
    urgency: "normal",
    status: "running",
    creator: "孙七",
    createTime: "2024-03-05 09:15",
    currentNode: "直属领导审批",
  },
  {
    id: 6,
    name: "周八-采购申请",
    type: "purchase",
    urgency: "urgent",
    status: "completed",
    creator: "周八",
    createTime: "2024-03-06 10:00",
    currentNode: "已完成",
  },
]);

const filteredData = computed(() => {
  if (!filterStatus.value) return flowData.value;
  return flowData.value.filter((item) => item.status === filterStatus.value);
});

const pagination = ref({ pageSize: 5 });

// 表格列配置
const columns = ref([
  {
    title: "流程名称",
    key: "name",
    ellipsis: true,
  },
  {
    title: "流程类型",
    key: "type",
    width: 100,
    render: (row: any) => {
      const typeMap: Record<string, string> = {
        leave: "请假审批",
        purchase: "采购审批",
        expense: "报销审批",
        contract: "合同审批",
      };
      return h(NTag, { size: "small", bordered: false, type: "info" }, { default: () => typeMap[row.type] || row.type });
    },
  },
  {
    title: "紧急程度",
    key: "urgency",
    width: 100,
    render: (row: any) => {
      const urgencyMap: Record<string, { text: string; type: string }> = {
        normal: { text: "普通", type: "default" },
        urgent: { text: "紧急", type: "warning" },
        "very-urgent": { text: "特急", type: "error" },
      };
      const info = urgencyMap[row.urgency] || { text: row.urgency, type: "default" };
      return h(NTag, { size: "small", bordered: false, type: info.type }, { default: () => info.text });
    },
  },
  {
    title: "状态",
    key: "status",
    width: 100,
    render: (row: any) => {
      const statusMap: Record<string, { text: string; type: string }> = {
        running: { text: "进行中", type: "warning" },
        completed: { text: "已完成", type: "success" },
        rejected: { text: "已驳回", type: "error" },
        pending: { text: "待审批", type: "info" },
      };
      const info = statusMap[row.status] || { text: row.status, type: "default" };
      return h(NTag, { size: "small", bordered: false, type: info.type }, { default: () => info.text });
    },
  },
  {
    title: "发起人",
    key: "creator",
    width: 80,
  },
  {
    title: "发起时间",
    key: "createTime",
    width: 160,
  },
  {
    title: "当前节点",
    key: "currentNode",
    width: 120,
  },
  {
    title: "操作",
    key: "actions",
    width: 160,
    render: (row: any) => {
      return h(NSpace, { size: "small" }, {
        default: () => [
          h(NButton, { size: "small", type: "primary", onClick: () => handleView(row) }, { default: () => "查看" }),
          row.status === "running" || row.status === "pending"
            ? h(NButton, { size: "small", type: "warning", onClick: () => handleApprove(row) }, { default: () => "审批" })
            : null,
        ],
      });
    },
  },
]);

function handleView(row: any) {
  message.info(`查看流程：${row.name}`);
}

function handleApprove(row: any) {
  message.info(`审批流程：${row.name}`);
}

function handleCreate() {
  showCreateModal.value = true;
}

function handleCreateConfirm() {
  if (!createModel.value.name) {
    message.warning("请输入流程名称");
    return false;
  }
  message.success("流程创建成功！");
  showCreateModal.value = false;
  createModel.value = {
    name: "",
    type: null,
    urgency: "normal",
    description: "",
  };
  return true;
}

function handleApproval() {
  approvalFormRef.value?.validate((err: any) => {
    if (!err) {
      const resultMap: Record<string, string> = {
        approve: "同意",
        reject: "驳回",
        transfer: "转审",
      };
      message.success(`审批提交成功！结果：${resultMap[approvalModel.value.result]}`);
      handleResetApproval();
    }
  });
}

function handleResetApproval() {
  approvalModel.value = {
    result: "approve",
    comment: "",
    transferTo: null,
  };
  approvalFormRef.value?.restoreValidation();
}
</script>

<style scoped>
.workflow {
  padding: 0;
}

.node-card {
  background: rgba(0, 0, 0, 0.02);
}
</style>