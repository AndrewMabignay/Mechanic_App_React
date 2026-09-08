import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    // server: {
    //     allowedHosts: [".trycloudflare.com"],
    //     proxy: {
    //         "/api": {
    //             target: "http://127.0.0.1:8000",
    //             changeOrigin: true,
    //             headers: {
    //                 Accept: "application/json",
    //             },
    //         },
    //     },
    // },
    server: {
        host: "0.0.0.0",
        port: 5173,

        allowedHosts: [".trycloudflare.com"],

        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
                headers: {
                    Accept: "application/json",
                },
            },
        },
    },
    // server: {
    //     host: "0.0.0.0",
    //     port: 5173,

    //     allowedHosts: [".trycloudflare.com"],

    //     proxy: {
    //         "/api": {
    //             target: "https://bike-mechanic-api.onrender.com",
    //             changeOrigin: true,
    //             headers: {
    //                 Accept: "application/json",
    //             },
    //         },
    //     },
    // },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
