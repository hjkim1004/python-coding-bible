import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스(localhost, 127.0.0.1, LAN)에서 접속 허용
    port: 3000,
    strictPort: true
  }
})
