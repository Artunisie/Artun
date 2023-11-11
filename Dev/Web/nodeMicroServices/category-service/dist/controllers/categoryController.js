"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const categoryController = {
    getAllCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield categoryModel_1.default.find();
            res.status(200).json(categories);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching categories' });
        }
    }),
    addCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const newCategory = new categoryModel_1.default({ name });
            yield newCategory.save();
            res.status(201).json(newCategory);
        }
        catch (error) {
            res.status(500).json({ message: 'Error adding a category' });
        }
    }),
    updateCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedCategory = yield categoryModel_1.default.findByIdAndUpdate(id, { name }, { new: true });
            if (updatedCategory) {
                res.status(200).json(updatedCategory);
            }
            else {
                res.status(404).json({ message: 'Category not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating the category' });
        }
    }),
    deleteCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedCategory = yield categoryModel_1.default.findByIdAndDelete(id);
            if (deletedCategory) {
                res.status(200).json({ message: 'Category deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Category not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting the category' });
        }
    }),
};
exports.default = categoryController;
