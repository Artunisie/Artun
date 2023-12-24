import express from 'express';
import { getAllReports, addReport } from '../controllers/reportsController';

const router = express.Router();

router.get('/', getAllReports);
router.post('/', express.json(), addReport);

export default router;
