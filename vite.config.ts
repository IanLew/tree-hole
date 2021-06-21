import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `
            true;
            @import "${resolve(__dirname, 'src/styles/variables.less')}";
            @import "${resolve(__dirname, 'src/styles/mixins.less')}";
          `
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: /^~/, replacement: '' }
    ]
  },
  plugins: [vue()]
})
