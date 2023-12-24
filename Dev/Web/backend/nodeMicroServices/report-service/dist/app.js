"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 3004;
// Connect to the database
mongoose_1.default.connect("mongodb+srv://seifeddine:ewyFHk1NAO0j78Oc@cluster0.o4udqpk.mongodb.net/reports")
    .then(() => {
    console.log('MongoDB connected');
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
})
    .catch(error => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
