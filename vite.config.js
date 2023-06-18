import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build : {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'vue3-diff',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      /**
       * DESC:
       * make sure to externalize deps that shouldn't be bundled
       * into your library
       */
      external: [
        'vue',
      ],
      output: {
        /**
         * DESC:
         * Provide global variables to use in the UMD build
         * for externalized deps
         */
        globals: {
          'vue': 'Vue'
        },
      },
    },
  }
})
