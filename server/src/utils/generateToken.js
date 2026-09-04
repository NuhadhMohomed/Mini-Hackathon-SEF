import jwt from 'jsonwebtoken';

const generateToken = (id, role = 'customer') => {
  const secret = process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || 'dev_crumb_bloom_jwt_secret_2026';
  return jwt.sign({ id, role }, secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '30d',
  });
};

export default generateToken;
