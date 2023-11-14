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
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const USER_SERVICE_BASE_URL = 'http://localhost:8888/user-service/api/users';
const JWT_SECRET = 'c6371fb187ae13cc0e9b94288545d521d74d022c7e76e0113330b0544f707e1a';
var tokenBlacklist = [];
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        tokenBlacklist = [];
        const userResponse = yield axios_1.default.get(`${USER_SERVICE_BASE_URL}?email=${email}`);
        const users = userResponse.data;
        const user = users.find((u) => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login successful', token });
        }
        else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
app.post('/logout', (req, res) => {
    const { token } = req.body;
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token is already blacklisted' });
    }
    tokenBlacklist.push(token);
    return res.status(200).json({ message: 'Logged out successfully' });
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Authentication service running on port ${PORT}`);
});
