import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      svgr({
        exportAsDefault: false,
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    build: {
      outDir: '../build',
      emptyOutDir: true,
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
  };
});