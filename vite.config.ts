import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/wakatime': {
          target: 'https://api.wakatime.com/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/wakatime/, ''),
          configure: (proxy) => {
            const token = Buffer.from((env.VITE_WAKATIME_API_KEY ?? '') + ':').toString('base64')
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Basic ${token}`)
            })
          },
        },
      },
    },
  }
})
