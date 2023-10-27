"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/', userController_1.createUser);
router.put('/:id', userController_1.updateUser);
router.delete('/:id', userController_1.deleteUser);
router.get('/verify-email', userController_1.verifyEmail);
router.post('/reset-password', userController_1.resetPassword);
router.post('/change-password', userController_1.changePassword); // New route for changing password
router.get('/', userController_1.getUsers);
router.get('/:id', userController_1.getUserById);
exports.default = router;
