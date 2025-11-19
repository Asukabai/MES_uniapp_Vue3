<template>
  <div class="container">
    <MBanner />
    <div class="wrapper">
      <MMenu />
      <MRecommend />
      <MAd />
    </div>
  </div>
</template>

<script setup>
import MBanner from './components/m-banner.vue';
import MMenu from './components/m-menu.vue';
import MRecommend from './components/m-recommend.vue';
import MAd from './components/m-ad.vue';
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: #EDF2FA;
  padding-bottom: 100rpx;
}

.wrapper {
  border-radius: 25rpx 25rpx 0 0;
  min-height: 200rpx;
  //border: 1px dashed black;
  background: #EDF2FA;
  position: relative;
  top: -20rpx;
}
</style>
