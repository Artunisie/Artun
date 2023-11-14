import express from 'express';
import adminController from '../controllers/adminController';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

const router = express.Router();

router.post('/categories', authenticationMiddleware, adminController.createCategory);
router.put('/categories/:id', authenticationMiddleware, adminController.updateCategory);
router.delete('/categories/:id', authenticationMiddleware, adminController.deleteCategory);
router.get('/reports', authenticationMiddleware, adminController.getReports);
router.put('/blockUser/:userId', authenticationMiddleware, adminController.blockUser);

export default router;
