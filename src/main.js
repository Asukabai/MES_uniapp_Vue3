import App from './App';
import { createSSRApp } from 'vue';
import routeManager from '@/pages/utils/routeManager.js';

export function createApp() {
  const app = createSSRApp(App);

  // 只在H5环境下处理Vue Router
  if (typeof window !== 'undefined') {
    console.log('=== 开始解析路径 ===');
    console.log('window.location.pathname:', window.location.pathname);

    // 从当前 URL 中提取基础路径
    const pathname = window.location.pathname;
    let basePath = '/';

    console.log('原始路径:', pathname);

    // 检查是否匹配 /sensor/ddingWork/{city}/ 模式
    const match = pathname.match(/^\/sensor\/ddingWork\/([^/]+)/);

    if (match) {
      const city = match[1];
      basePath = `/sensor/ddingWork/${city}/`;

      console.log('匹配成功，城市:', city);
      console.log('计算出的basePath:', basePath);

      // 添加重定向逻辑
      if (pathname === `/sensor/ddingWork/${city}` || pathname === basePath) {
        // 如果是城市根路径，重定向到首页
        const targetPath = `${basePath}home`;
        console.log('执行重定向到:', targetPath);
        window.location.href = targetPath;
        return { app }; // 重定向时提前返回
      }
    } else {
      console.log('路径不匹配模式，使用默认basePath:', basePath);
    }

    // 设置到全局属性供路由使用
    app.config.globalProperties.$basePath = basePath;
    console.log('最终设置的basePath:', basePath);

    app.config.globalProperties.$h5 = true;
    console.log('H5模式已启用');

    // 动态导入Vue Router，避免与UniApp冲突
    import('@/router/index.js').then(routerModule => {
      const router = routerModule.default;
      app.use(router);

      // 初始化路由
      router.isReady().then(() => {
        console.log('Vue Router 初始化完成');

        // 检查当前路径是否需要重定向
        const currentPath = window.location.pathname.replace(basePath, '');
        if (currentPath === '' || currentPath === '/') {
          router.replace('/home');
        }
      });
    }).catch(error => {
      console.error('Vue Router 加载失败:', error);
    });
  }

  // 提供路由管理器给所有组件使用
  app.provide('$routeManager', routeManager);

  return {
    app,
  };
}