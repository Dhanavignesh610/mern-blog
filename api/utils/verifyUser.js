import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
  const authAccessToken = req.headers.authorization || req.headers.Authorization
  if (!authAccessToken?.startsWith('Bearer ')) return res.sendStatus(401); 
  const accessToken = authAccessToken.split(' ')[1]; 
  if (!accessToken) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify( accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
