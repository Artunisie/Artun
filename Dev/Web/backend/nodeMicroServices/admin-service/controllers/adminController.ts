import { Request, Response } from 'express';
import Category from '../models/category';
import Report from '../models/report';
import User from '../models/user';

const adminController = {
  createCategory: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error creating a category' });
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

  getReports: async (req: Request, res: Response) => {
    try {
      const reports = await Report.find();
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports' });
    }
  },

  blockUser: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const reportsCount = await Report.countDocuments({ userId });

      if (reportsCount > 10) {
        const blockedUser = await User.findByIdAndUpdate(userId, { blocked: true });
        if (blockedUser) {
          res.status(200).json({ message: 'User blocked successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } else {
        res.status(200).json({ message: 'Insufficient reports to block the user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error blocking the user' });
    }
  },
};

export default adminController;
