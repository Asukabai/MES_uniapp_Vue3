import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, command }) => {
  return {
    plugins: [uni()],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: true,
      open: true,
      port: 10002,
      proxy: {},
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import 'src/uni.scss';`,
        },
      },
    },
  };
});
