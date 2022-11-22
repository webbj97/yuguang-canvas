import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/yuguang-vite/',
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@components": resolve(__dirname, "./src/components"),
        },
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
            },
        },
    },
});
