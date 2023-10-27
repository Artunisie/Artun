// src/routes/userRoutes.ts
import express from 'express';
import { createUser, updateUser, deleteUser, verifyEmail, resetPassword } from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);

export default router;
