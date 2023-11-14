import { Router } from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  verifyEmail,
  resetPassword,
  blockUser,
  reportUser,
  getUsers,
  getUserById,
  changePassword, 
  UnblockUser
} from '../controllers/userController';

const router = Router();
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/block-user/:id', blockUser);
router.put('/Unblock-user/:id', UnblockUser);
router.put('/report-user/:id', reportUser);
router.delete('/:id', deleteUser);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);
router.get('/', getUsers);
router.get('/:id', getUserById); 

export default router;
