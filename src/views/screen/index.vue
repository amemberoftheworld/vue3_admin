<template>
  <div class="container">
    <div class="screen" ref="screen">
      <Top />
      <div class="bottom">
        <BLeft />
        <BCenter />
        <BRight />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './top/index.vue'
import BLeft from './BLeft/index.vue'
import BCenter from './BCenter/index.vue'
import BRight from './BRight/index.vue'
let screen = ref()

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
</script>
<script lang="ts">
export default { name: 'Screen' }
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left: 50%;
    transform-origin: left top;

    // .top {
    //   width: 100%;
    //   height: 40px;
    // }
    .bottom {
      display: flex;

      // .right {
      //   flex: 1;
      // }
      // .left
      // .center {
      //   flex: 2;
      // }
    }
  }
}
</style>
