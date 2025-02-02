import { defineConfig } from 'vite'

export default defineConfig({
    root: '.',
    base: '/HundredCupsOfTin-JS/',
    build: {
        outDir: 'dist',
    },
    publicDir: 'public'
})