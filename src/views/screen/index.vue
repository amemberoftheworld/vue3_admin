<template>
  <div class="container">
    <div class="screen">
      <div class="top"></div>
      <div class="bottom">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default { name: 'Screen' }
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
 background: url("@/assets/images/bg.png");
  .screen {
    width: 1920px;
    height: 1080px;
    // background-color: salmon;

  }
}
</style>
