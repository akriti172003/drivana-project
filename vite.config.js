import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // You might need to install 'path' or use 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This tells Vite that '@' always means the 'src' folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
})