import express from 'express';
import categoryRoutes from './routes/categoryRoutes';
import { connectDB } from './db'; 
import cors from 'cors'; // Import the cors middleware
const app = express();

connectDB();
app.use(cors());

app.use(express.json());
app.use('/categories', categoryRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Category Service running on port ${PORT}`);
});
