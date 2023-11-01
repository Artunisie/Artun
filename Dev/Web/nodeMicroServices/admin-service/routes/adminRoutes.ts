import express from 'express';
import adminController from '../controllers/adminController';
import authenticateAsAdmin from '../middleware/authenticationMiddleware';

const router = express.Router();

router.post('/categories', authenticateAsAdmin, adminController.createCategory);
router.put('/categories/:id', authenticateAsAdmin, adminController.updateCategory);
router.delete('/categories/:id', authenticateAsAdmin, adminController.deleteCategory);
router.put('/blockUser/:userId', authenticateAsAdmin, adminController.blockUser);

export default router;