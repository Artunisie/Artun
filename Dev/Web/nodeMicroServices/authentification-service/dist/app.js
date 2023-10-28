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
const app = (0, express_1.default)();
app.use(express_1.default.json());
const USER_SERVICE_BASE_URL = 'http://localhost:3000/api/users';
// Endpoint for user login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Get user details from the user-service based on the provided email
        const userResponse = yield axios_1.default.get(`${USER_SERVICE_BASE_URL}?email=${email}`);
        const user = userResponse.data[0]; // Assuming the response is an array with a single user
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare the hashed password stored in the database with the provided password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (isPasswordValid) {
            return res.status(200).json({ message: 'Login successful' });
        }
        else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Authentication service running on port ${PORT}`);
});
