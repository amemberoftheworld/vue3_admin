<template>
  <div class="top">
    <div class="left">
      <div @click="goHome">首页</div>
    </div>
    <div class="center">
      <div>XXX数据平台</div>
    </div>
    <div class="right">
      <span>统计报告</span>
      <span>当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { dayjs } from 'element-plus'
import { onBeforeUnmount, onMounted, ref } from 'vue'

let $router = useRouter()
let time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
let timer: any = ref('')

const goHome = () => {
  $router.push('/home')
}

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>
<script lang="ts">
export default { name: 'Top' }
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url('../../../assets/images/dataScreen-header-left-bg.png')
      no-repeat;
    background-size: cover;
    div {
      width: 100px;
      height: 40px;
      float: right;
      text-align: center;
      line-height: 40px;
      background: url('../../../assets/images/dataScreen-header-btn-bg-l.png')
        no-repeat;
      background-size: 100% 100%;
      color: #fff;
    }
  }

  .center {
    flex: 2;
    div {
      height: 74px;
      text-align: center;
      line-height: 74px;
      color: #fff;
      background: url('../../../assets/images/dataScreen-header-center-bg.png');
      background-size: 100% 100%;
      font-size: 30px;
    }
  }

  .right {
    flex: 1;
    background: url('../../../assets/images/dataScreen-header-right-bg.png')
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #fff;
      line-height: 40px;
    }
    span:nth-child(1) {
      width: 100px;
      height: 40px;
      text-align: center;
      background: url('../../../assets/images/dataScreen-header-btn-bg-r.png')
        no-repeat;
      background-size: 100% 100%;
    }
    span:nth-child(2) {
      margin-right: 10px;
    }
  }
}
</style>
