import dotenv from "dotenv";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(process.env.VITE_PORT ?? 5000),
    },
});
