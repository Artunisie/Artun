import express, { Request, Response } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

const USER_SERVICE_BASE_URL = 'http://localhost:3000/api/users';

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userResponse = await axios.get(`${USER_SERVICE_BASE_URL}?email=${email}`);

    const user = userResponse.data[0]; 
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});
