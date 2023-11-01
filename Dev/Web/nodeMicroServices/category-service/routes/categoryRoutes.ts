import express from 'express';
import categoryController from '../src/controllers/categoryController';

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
