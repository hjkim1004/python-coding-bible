import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 상대 경로로 굽는다 — 저장소 이름이 무엇이든 GitHub Pages 하위 경로에서 그대로 열린다.
  base: './',
  server: { host: true, port: 3000, strictPort: true },
});
