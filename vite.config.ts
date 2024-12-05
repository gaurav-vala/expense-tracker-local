<<<<<<< HEAD
import path from "path"
=======
>>>>>>> c6173b1 (Resolve merge conflicts)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
=======
>>>>>>> c6173b1 (Resolve merge conflicts)
})
