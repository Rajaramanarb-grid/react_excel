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
                                console.log("body", body)
                                const received = body ? JSON.parse(body) : {};
                                res.end(
                                    JSON.stringify({
                                            "errors": null,
                                            "responseCode": 0,
                                            "responseDescription": "Success",
                                            "responseDetailCode": 0,
                                            "message": null,
                                            "exceptionMessage": null,
                                            "exceptionType": null,
                                            "stackTrace": null,
                                            "responseDetailDescription": "Success",
                                            "data": {
                                                "webBundleList": [
                                                    {
                                                        "rowNumber": 1,
                                                        "statusKey": 0,
                                                        "status": "Verified"
                                                    },
                                                    {
                                                        "rowNumber": 2,
                                                        "statusKey": 10,
                                                        "status": "Duplicate Sub Company ID"
                                                    },
                                                    {
                                                        "rowNumber": 3,
                                                        "statusKey": 10,
                                                        "status": "Duplicate Sub Company ID"
                                                    }
                                                ]
                                            }
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
