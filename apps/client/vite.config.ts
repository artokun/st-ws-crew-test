import { defineConfig } from 'vite';
import { thyseus } from '@thyseus/rollup-plugin-thyseus';

export default defineConfig({
  plugins: [thyseus()],
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      strict: true,
    },
  },
});
