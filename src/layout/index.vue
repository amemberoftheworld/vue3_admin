<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="layout-content">
      <div class="layout_tabbar">
        <Tabbar></Tabbar>
      </div>

      <div class="layout_main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'

let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
let $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-wrap: wrap;
  .layout_slider {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-background;

    .scrollbar {
      height: calc(100vh - $base-menu-logo-height - 20px);
      color: #fff;

      .el-menu {
        border-right: 0;
      }
    }
  }

  .layout-content {
    width: calc(100% - $base-menu-width);
    height: 100%;
    .layout_tabbar {
      height: $base-tabbar-height;
    }
    .layout_main {
      height: calc(100% - $base-tabbar-height);
      background-color: saddlebrown;
      overflow: auto;
      padding: 20px;
    }
  }
}
</style>
