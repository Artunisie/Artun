"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = 3004;
// Connect to the database
(0, db_1.connectDB)();
// Use cors middleware
app.use((0, cors_1.default)());
// Parse JSON bodies
app.use(express_1.default.json());
// Routes
app.use('/reports', reportRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Reports Service running on port ${PORT}`);
});
