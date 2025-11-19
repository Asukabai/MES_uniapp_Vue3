<template>
  <div class="ad">
    <image class="bg" :src="BgAd" mode="aspectFill"></image>
  </div>
</template>
<script setup>
import BgAd from '@/static/images/bg-ad.jpg';
</script>

<style scoped lang="scss">
.ad {
  padding: 30rpx;

  .bg {
    width: 690rpx;
    height: 300rpx;
    border-radius: 10rpx;
  }
}
</style>
