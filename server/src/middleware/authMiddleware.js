import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || 'dev_crumb_bloom_jwt_secret_2026';
      const decoded = jwt.verify(token, secret);

      // Handle Owner token
      if (decoded.role === 'owner') {
        req.user = { _id: decoded.id, role: 'owner', name: process.env.OWNER_NAME || 'Julian Hayes' };
        return next();
      }

      // Handle Customer token
      try {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          req.user = user;
          return next();
        }
      } catch (dbErr) {
        // Fallback for mock/memory session if user exists in token
      }

      req.user = { _id: decoded.id, role: decoded.role || 'customer' };
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
    }
    next();
  };
};
