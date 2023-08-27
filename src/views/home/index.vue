<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div>
        <h3>{{ getTime() }}好，{{ userStore.username }}</h3>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

let userStore = useUserStore()
</script>
<script lang="ts">
export default {
  name: 'Home',
}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  > div {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
