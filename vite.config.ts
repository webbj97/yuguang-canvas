import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
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
