"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const db_1 = require("./db");
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use('/categories', categoryRoutes_1.default);
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Category Service running on port ${PORT}`);
});
