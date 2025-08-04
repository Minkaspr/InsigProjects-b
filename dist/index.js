"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./lib/prisma");
if (process.env.NODE_ENV !== "production") {
    process.loadEnvFile();
    (0, prisma_1.testConnection)();
}
const routes_1 = __importDefault(require("./routes/routes"));
const error_handler_1 = require("./utils/error-handler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const AUTHOR = process.env.AUTHOR || "Desconocido";
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Politica de CORS: Acceso denegado desde este origen."));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("✅ Servidor Express funcionando correctamente");
});
app.get("/api/v1/credentials", (req, res) => {
    res.json({ author: AUTHOR });
});
app.use("/api/v1", routes_1.default);
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
