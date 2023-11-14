import { Request, Response } from 'express';
import Category from '../models/categoryModel';

const categoryController = {
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  },

  addCategory: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error adding a category' });
    }
  },

  updateCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating the category' });
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (deletedCategory) {
        res.status(200).json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting the category' });
    }
  },
};

export default categoryController;
