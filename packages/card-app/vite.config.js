import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from "@module-federation/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'card-app',
      filename: 'remoteEntry.js',
      // Exposed modules
      exposes: {
        './Card': './src/components/Card.jsx',
      },
      shared: ['react', 'react-dom'],
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
