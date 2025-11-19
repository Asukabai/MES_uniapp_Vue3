<template>
  <div class="swiper">
    <wd-swiper
      v-model:current="current"
      height="370rpx"
      :indicator="{ type: 'dots-bar' }"
      :list="swiperList"
      autoplay
      @click="onClick"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Banner from '@/static/images/background.png';

const swiperList = ref([Banner]);
const current = ref(0);

function onClick() {}
</script>

<style scoped lang="scss">
.swiper {
  --wot-swiper-radius: 0;
}
</style>
