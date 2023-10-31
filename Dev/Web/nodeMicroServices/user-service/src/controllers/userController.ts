import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, ncin, ntel ,role} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      ncin,
      ntel,
      role:"CLIENT"
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    sendVerificationEmail(user.email, token);

    res.status(201).json({ message: 'User created successfully. Please check your email for verification.' + token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, password, name, ncin, ntel } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (name) {
      user.name = name;
    }

    if (ncin) {
      user.ncin = ncin;
    }

    if (ntel) {
      user.ntel = ntel;
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ message: 'Invalid token' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verification successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  sendPasswordResetEmail(user.email, token);

  res.status(200).json({ message: 'Password reset instructions sent to your email' + token});
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ message: 'Invalid token or password' });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sendVerificationEmail = (email: string, token: string): void => {
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.YAHOO_EMAIL_USER,
      pass: process.env.YAHOO_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.YAHOO_EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Click on the following link to verify your email: http://localhost:3000/verifyEmail?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendPasswordResetEmail = (email: string, token: string): void => {
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.YAHOO_EMAIL_USER,
      pass: process.env.YAHOO_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.YAHOO_EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `Click on the following link to reset your password: http://localhost:3000/resetPassword?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  createUser,
  updateUser,
  deleteUser,
  verifyEmail,
  resetPassword,
  getUsers,
  getUserById,
  changePassword,
};
