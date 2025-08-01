import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/data': path.resolve(__dirname, './src/data'),
      },
    },
    server: {
      port: parseInt(env.VITE_DEV_PORT || '3000', 10),
      host: env.VITE_DEV_HOST || 'localhost',
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  }
})
