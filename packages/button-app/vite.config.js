import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from "@module-federation/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'button-app',
      filename: 'remoteEntry.js',
      // Exposed modules
      exposes: {
        './Button': './src/components/Button.jsx',
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
