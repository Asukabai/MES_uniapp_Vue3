<!-- src/App.vue -->
<script setup>
import { onLoad, onShow, onLaunch } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
import routeManager from '@/pages/utils/routeManager.js';

// 在H5模式下使用Vue Router
let router = ref(null);

onLaunch(() => {
  console.log('App onLaunch');
});

onLoad(() => {
  console.log('App onLoad');
});

onShow(() => {
  console.log('App onShow');
  // 页面显示时记录路由信息
  routeManager.addCurrentRoute();
});

// 只在H5环境下初始化Vue Router
if (typeof window !== 'undefined') {
  onMounted(async () => {
    try {
      const routerModule = await import('@/router/index.js');
      router.value = routerModule.default;

      console.log('Vue Router 在App中初始化');
    } catch (error) {
      console.error('Vue Router 初始化失败:', error);
    }
  });
}
</script>

<template>
  <!-- 使用 UniApp 的原生页面路由 -->
  <view>
    <router-view v-if="typeof window !== 'undefined' && router"></router-view>
    <!-- 在小程序和其他平台使用 UniApp 默认路由 -->
    <view v-else>
      <!-- UniApp 默认页面容器 -->
    </view>
  </view>
</template>

<style>
/*每个页面公共css */
page {
  background-color: #f5f5f5;
  height: 100%;
}

.container {
  min-height: 100vh;
  background-color: #ffffff;
}

/* 确保路由视图正确显示 */
#app {
  height: 100%;
}
</style>