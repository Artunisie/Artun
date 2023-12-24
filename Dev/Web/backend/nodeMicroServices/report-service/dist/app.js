"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // <-- Add this line
app.use('/reports', reportRoutes_1.default);
const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Report Service running on port ${PORT}`);
});
