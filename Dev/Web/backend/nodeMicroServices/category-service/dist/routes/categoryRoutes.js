"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const router = express_1.default.Router();
router.get('/', categoryController_1.default.getAllCategories);
router.post('/', categoryController_1.default.addCategory);
router.put('/:id', categoryController_1.default.updateCategory);
router.delete('/:id', categoryController_1.default.deleteCategory);
router.get('/:id', categoryController_1.default.getCategoryById);
exports.default = router;
