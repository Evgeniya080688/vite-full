import Inspect from 'vite-plugin-inspect'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import handlebars from 'vite-plugin-handlebars';


// const root = resolve(__dirname, '.')
const root = resolve(__dirname, './src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
    base: './',
    root,
    preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8080",
    },

    plugins: [
        handlebars({
            // Опционально: путь к партиалам (компонентам)
            partialDirectory: resolve(__dirname, 'src/partials'),
            // Опционально: контекст (данные) для шаблонов
            context: {
                title: 'Заголовок страницы',
                description: 'Описание из конфига'
            },
        }),
        Inspect(),
        ViteImageOptimizer({
            // https://github.com/FatehAK/vite-plugin-image-optimizer
            png: {
                quality: 70,
            },
            jpeg: {
                quality: 70,
            },
            jpg: {
                quality: 70,
            },
        }),
    ],

    resolve: {
        alias: {
            // '@': resolve(__dirname, '/node_modules/bootstrap'),
            // 'bootstrap': resolve(__dirname, '/node_modules/bootstrap'),
        }
    },
    build: {
        outDir,
        emptyOutDir: true,
        minify: true,
        cssMinify: true,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                about: resolve(root, 'pages/about.html'),
                category: resolve(root, 'pages/category.html'),
            },
            output: {
                assetFileNames: ({ name }) => {
                    name = name.toLowerCase()

                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
                        return 'assets/images/[name]-[hash][extname]'
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/styles/[name]-[hash][extname]'
                    }

                    // default value
                    return 'assets/[name]-[hash][extname]'
                },
            },
        }
    },
})