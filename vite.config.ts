import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' keeps asset paths relative so GitHub Pages works under /repo-name/
export default defineConfig({ base: './', plugins: [react()] })
