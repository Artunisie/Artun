import express, { Request, Response } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

const USER_SERVICE_BASE_URL = 'http://localhost:3000/api/users';

// Endpoint for user login
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Get user details from the user-service based on the provided email
    const userResponse = await axios.get(`${USER_SERVICE_BASE_URL}?email=${email}`);

    const user = userResponse.data[0]; // Assuming the response is an array with a single user

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the hashed password stored in the database with the provided password
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
