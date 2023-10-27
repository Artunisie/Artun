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
exports.getUserById = exports.getUsers = exports.resetPassword = exports.verifyEmail = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, ncin, ntel } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({
            email,
            password: hashedPassword,
            name,
            ncin,
            ntel,
        });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        sendVerificationEmail(user.email, token);
        res.status(201).json({ message: 'User created successfully. Please check your email for verification.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email, password, name, ncin, ntel } = req.body;
        const user = yield User_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            user.password = hashedPassword;
        }
        if (name) {
            user.name = name;
        }
        if (ncin) {
            user.ncin = ncin;
        }
        if (ntel) {
            user.ntel = ntel;
        }
        yield user.save();
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteUser = deleteUser;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    if (!token) {
        res.status(400).json({ message: 'Invalid token' });
        return;
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.isVerified = true;
        yield user.save();
        res.status(200).json({ message: 'Email verification successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.verifyEmail = verifyEmail;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    sendPasswordResetEmail(user.email, token);
    res.status(200).json({ message: 'Password reset instructions sent to your email' });
});
exports.resetPassword = resetPassword;
const sendVerificationEmail = (email, token) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Click on the following link to verify your email: http://localhost:3000/verifyEmail?token=${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
const sendPasswordResetEmail = (email, token) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'Yahoo',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Click on the following link to reset your password: http://localhost:3000/resetPassword?token=${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const userWithoutPassword = Object.assign(Object.assign({}, user.toJSON()), { password: undefined });
        res.status(200).json({ user: userWithoutPassword });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserById = getUserById;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}, '-password');
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUsers = getUsers;
