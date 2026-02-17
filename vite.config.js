import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: "mock-upload-api",
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === "/api/upload" && req.method === "POST") {
                        let body = "";
                        req.on("data", (chunk) => (body += chunk));
                        req.on("end", () => {
                            res.setHeader("Content-Type", "application/json");
                            try {
                                const received = body ? JSON.parse(body) : {};
                                res.end(
                                    JSON.stringify({
                                        success: true,
                                        message: "Upload received",
                                        received,
                                    })
                                );
                            } catch {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
                            }
                        });
                        return;
                    }
                    next();
                });
            },
        },
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
