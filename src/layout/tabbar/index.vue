<template>
  <div class="tabbar">
    <div class="tabbar_left common">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right common">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: $base-menu-background;
  // background-image: linear-gradient(
  //   to right,
  //   rgb(8, 8, 8),
  //   rgb(13, 9, 24),
  //   rgb(3, 3, 3)
  // );
  .tabbar_left {
    margin-left: 20px;
  }
  .tabbar_right {
  }
  .common {
    display: flex;
  }
}
</style>
