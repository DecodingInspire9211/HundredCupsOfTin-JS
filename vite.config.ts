import { defineConfig } from 'vite'

export default defineConfig({
    root: '.', // Set the root directory to the project root
    base: '/HundredCupsOfTin-JS/',
    build: {
        outDir: 'dist', // Output directory
        assetsDir: '.', // Place assets directly in the output directory
        rollupOptions: {
            input: {
                main: 'index.html', // Entry point for the build
            },
        },
    },
})