import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { isDbConnected, memoryStore } from '../config/db.js';

export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        message: 'All fields are required: name, email, password, phone, address',
      });
    }

    if (isDbConnected()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: 'customer',
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      // Memory Store
      const userExists = memoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: `user-${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: 'customer',
      };
      memoryStore.users.push(newUser);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
        token: generateToken(newUser._id, newUser.role),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const ownerEmail = process.env.OWNER_EMAIL || 'owner@crumbandbloom.com';
    const ownerPassword = process.env.OWNER_PASSWORD || 'Hearth2026!';

    // Handle Owner Login check
    if (email.toLowerCase() === ownerEmail.toLowerCase() && password === ownerPassword) {
      return res.status(200).json({
        message: 'Login successful',
        token: generateToken('owner-static-id', 'owner'),
        role: 'owner',
        user: {
          name: process.env.OWNER_NAME || 'Julian Hayes',
          email: ownerEmail,
          role: 'owner',
        },
      });
    }

    if (isDbConnected()) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
          message: 'Login successful',
          token: generateToken(user._id, user.role),
          role: user.role,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    } else {
      // Memory Store check
      const user = memoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        const isMatch = user.password === password || (await bcrypt.compare(password, user.password));
        if (isMatch) {
          return res.status(200).json({
            message: 'Login successful',
            token: generateToken(user._id, user.role),
            role: user.role,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};
