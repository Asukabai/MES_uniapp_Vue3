import App from './App';

import { createSSRApp } from 'vue';

export function createApp() {
  const app = createSSRApp(App);
  // 添加 H5 模式配置
  app.config.globalProperties.$h5 = true;
  return {
    app,
  };
}
