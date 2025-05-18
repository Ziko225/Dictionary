import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { readdirSync, statSync } from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const srcDir = path.resolve(__dirname, 'src');

  const srcFolders = readdirSync(srcDir).filter(name => {
    const fullPath = path.join(srcDir, name);
    return statSync(fullPath).isDirectory();
  });

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
      outDir: './build',
      emptyOutDir: true,
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
    resolve: {
      alias: [
        ...srcFolders.map((folder) => ({ find: folder, replacement: path.resolve(__dirname, `src/${folder}`) })),
        { find: 'theme.scss', replacement: path.resolve(__dirname, 'src/theme.scss') },
        { find: 'constants', replacement: path.resolve(__dirname, 'src/constants.js') }
      ]
    },
  };
});