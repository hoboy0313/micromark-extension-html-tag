import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.mts',
            name: 'micromark-extension-html-tag',
            fileName: 'index',
            formats: ['es'],
        },
        minify: false,
    }
});
