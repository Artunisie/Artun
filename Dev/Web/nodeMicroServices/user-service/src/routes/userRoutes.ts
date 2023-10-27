import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  verifyEmail,
  resetPassword,
  getUsers,
  getUserById,
} from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);

router.get('/', getUsers);
router.get('/:id', getUserById); 

export default router;
