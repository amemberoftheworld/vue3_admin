<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <div class="breadcrumb-content">
        <el-icon style="margin: 0 5px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
let layoutSettingStore = useLayoutSettingStore()
let changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
let $route = useRoute()
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped>
.breadcrumb-content {
  display: flex;
  align-items: center;
}
</style>
