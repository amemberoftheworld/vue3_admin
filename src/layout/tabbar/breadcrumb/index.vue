<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">promotion management</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
let changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
