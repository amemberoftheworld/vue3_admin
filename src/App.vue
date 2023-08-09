<template>
  <el-button type="primary" :icon="Edit" circle />
  <el-button type="success" :icon="Check" circle />
  <el-button type="info" :icon="Message" circle />
  <el-button type="warning" :icon="Star" circle />
  <el-button type="danger" :icon="Delete" circle />
  <el-button type="danger" :icon="Search" circle>Danger</el-button>

  <el-time-picker v-model="value1" placeholder="Arbitrary time" />
  <el-time-picker v-model="value2" arrow-control placeholder="Arbitrary time" />

  <SvgIcon name="scan" color="skyblue" width="100px" height="100px"></SvgIcon>

  <div>
    <span>App</span>
  </div>
</template>

<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

// import SvgIcon from './components/SvgIcon/index.vue'

import { ref } from 'vue'
const value1 = ref()
const value2 = ref()
</script>

<style scoped lang="scss">
div {
  span {
    color: $base-color;
  }
}
</style>
