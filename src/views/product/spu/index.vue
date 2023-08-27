<template>
  <div>
    <Category :flag="flag"></Category>
    <el-card style="margin-top: 10px">
      <el-button type="primary" icon="Plus">添加</el-button>
      <el-table style="margin-top: 10px" border>
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="SPU名称" align="center"></el-table-column>
        <el-table-column label="SPU描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center"></el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        background
        layout="prev, pager, next, jumper,->,sizes,total,"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 10px"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let flag = ref<boolean>(true)
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
</script>
<script lang="ts">
export default {
  name: 'SPU',
}
</script>

<style scoped></style>
