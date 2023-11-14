import express, { Request, Response } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const USER_SERVICE_BASE_URL = 'http://localhost:8888/user-service/api/users';
const JWT_SECRET = 'c6371fb187ae13cc0e9b94288545d521d74d022c7e76e0113330b0544f707e1a'; 

var tokenBlacklist: string[] = [];

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    tokenBlacklist=[]
    const userResponse = await axios.get(`${USER_SERVICE_BASE_URL}?email=${email}`);
    const users = userResponse.data;
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/logout', (req: Request, res: Response) => {
  const { token } = req.body;

  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ message: 'Token is already blacklisted' });
  }

  tokenBlacklist.push(token);
  return res.status(200).json({ message: 'Logged out successfully' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});
