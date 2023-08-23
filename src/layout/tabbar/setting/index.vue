<template>
  <el-button
    type="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    type="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button type="small" icon="Setting" circle></el-button>

  <div class="user">
    <img
      :src="userStore.avatar"
      style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'

let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const fullScreen = () => {
  let isFull = document.fullscreenElement
  if (!isFull) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped lang="scss">
.user {
  display: flex;
  .el-dropdown-link {
    line-height: 24px;
  }
}
</style>
