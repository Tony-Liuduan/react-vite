import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

const PUBLIC_DIR = {
  'development': '',
  'testing': 'https://cdn-test.com',
  'staging': 'https://cdn.com',
  'production': 'https://cdn.com',
}

// https://vitejs.dev/config/
export default defineConfig(async (env) => {
  console.log(env);
  return {
    plugins: [reactRefresh()],
    root: path.resolve(__dirname, 'packages'),
    base: PUBLIC_DIR[env.mode],
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'assets'),
      }
    },
    server: {
      port: 3001
    },
    build: {
      target: 'esnext',
      polyfillModulePreload: false,
      sourcemap: true,
      outDir: path.resolve(__dirname, 'dist'),
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'packages/index/index.html'),
          user: path.resolve(__dirname, 'packages/user/index.html')
        },
      }
    }
  }
})
