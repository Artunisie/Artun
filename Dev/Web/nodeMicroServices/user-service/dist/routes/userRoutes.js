"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/', userController_1.createUser);
router.put('/:id', userController_1.updateUser);
router.delete('/:id', userController_1.deleteUser);
router.get('/verify-email', userController_1.verifyEmail);
router.post('/reset-password', userController_1.resetPassword);
router.get('/', userController_1.getUsers);
router.get('/:id', userController_1.getUserById);
exports.default = router;
