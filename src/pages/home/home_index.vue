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
import { inject, onMounted } from 'vue'; // 添加这行导入

// 注入路由管理器
const routeManager = inject('$routeManager');

onMounted(() => {
  // 记录当前路由
  routeManager.addCurrentRoute();

  // 获取路由历史
  const history = routeManager.getRouteHistory();
  console.log('Route history Home_page :', history);

  // 获取当前页面的完整地址
  const currentFullUrl = window.location.href;
  console.log('当前完整地址:', currentFullUrl);
});

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
