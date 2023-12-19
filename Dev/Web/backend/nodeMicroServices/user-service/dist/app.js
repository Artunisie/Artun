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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const mongodbURI = process.env.MONGODB_URI;
const emailUser = process.env.YAHOO_EMAIL_USER;
const emailPass = process.env.YAHOO_EMAIL_PASS;
if (!mongodbURI || !emailUser || !emailPass) {
    console.error("Please set the required environment variables.");
    process.exit(1);
}
mongoose_1.default.connect((_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "DEAD")
    .then(() => {
    console.log("MongoDb connection success");
})
    .catch((err) => {
    console.error('MongoDb connection error:', err);
});
const createInitialUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = mongoose_1.default.model('User');
        const existingUser = yield User.findOne({ email: 'example@example.com' });
        if (!existingUser) {
            const user = new User({
                email: 'example@example.com',
                password: 'yourpassword',
                name: 'Example User',
                ncin: '1234567890',
                ntel: '9876543210',
                role: "ADMIN",
                isVerified: true
            });
            yield user.save();
        }
    }
    catch (error) {
        console.error('Error creating initial user:', error);
    }
});
app.use(body_parser_1.default.json());
// Use cors middleware
app.use((0, cors_1.default)());
app.use('/api/users', userRoutes_1.default);
createInitialUser();
app.listen(port, () => {
    console.log(`User Service is running on port ${port}`);
});
