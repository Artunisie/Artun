import express from 'express';
import router from './routes/reportRoutes';
import { connectDB } from './db'; 
import cors from 'cors';

const app = express();

connectDB();
app.use(cors());
app.use(express.json());  
app.use('/reports', router);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Report Service running on port ${PORT}`);
});
