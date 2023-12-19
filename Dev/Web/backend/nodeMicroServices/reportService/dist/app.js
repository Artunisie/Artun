"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser")); // Add this line for body parsing
const reportRouter_1 = __importDefault(require("./routes/reportRouter"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = 3004;
// Connect to the database
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.connectDB)();
            console.log('Connected to the database');
            // Use cors middleware
            app.use((0, cors_1.default)());
            // Parse JSON bodies
            app.use(body_parser_1.default.json()); // Use body-parser for JSON parsing
            // Log incoming requests
            app.use((req, res, next) => {
                console.log('Received Request:', req.method, req.url, req.body);
                next();
            });
            // Error handling middleware
            app.use((err, req, res, next) => {
                console.error(err.stack);
                res.status(500).send('Something went wrong!');
            });
            // Routes
            app.use('/reports', reportRouter_1.default);
            // Start the server
            app.listen(PORT, () => {
                console.log(`Reports Service running on port ${PORT}`);
            });
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
        }
    });
}
startServer();
