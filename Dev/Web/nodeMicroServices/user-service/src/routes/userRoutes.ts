import { Router } from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  verifyEmail,
  resetPassword,
  getUsers,
  getUserById,
  changePassword, // Adding the new password change route
} from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword); // New route for changing password

router.get('/', getUsers);
router.get('/:id', getUserById); 

export default router;
