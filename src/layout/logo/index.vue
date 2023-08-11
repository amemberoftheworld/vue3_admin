<template>
  <div class="logo" v-if="!setting.logoHidden">
    <!-- <SvgIcon name="logo"></SvgIcon> -->
    <img :src="setting.logo" alt="" srcset="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
