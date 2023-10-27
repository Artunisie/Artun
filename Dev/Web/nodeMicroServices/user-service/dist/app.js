"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Check if environment variables exist
const mongodbURI = process.env.MONGODB_URI;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
if (!mongodbURI || !emailUser || !emailPass) {
    console.error("Please set the required environment variables.");
    process.exit(1); // Terminate the application
}
// Connect to MongoDB using the new options format
mongoose_1.default.connect((_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "DEAD")
    .then(() => {
    console.log("MongoDb connection success");
})
    .catch((err) => {
    console.error('MongoDb connection error:', err);
});
app.use(body_parser_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.listen(port, () => {
    console.log(`User Service is running on port ${port}`);
});
