import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authenticateAsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    const tokenInfo = jwt.verify(token, JWT_SECRET) as { email: string, userId: string };
    const { email, userId } = tokenInfo;

    const loginResponse = await axios.post('http://authentication-service-domain/login', { email, userId });
    const userData = loginResponse.data;

    const userDetailsServiceURL = `http://user-service-domain/api/users/${userData.userId}`;
    const userResponse = await axios.get(userDetailsServiceURL);
    const user = userResponse.data;

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error in authentication or authorization' });
  }
};

export default authenticateAsAdmin;
