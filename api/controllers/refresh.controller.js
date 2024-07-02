import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken; 
    if (!refreshToken) return next(errorHandler(401, 'Unauthorized'));
    
    jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, validUser) => {
        if (err ) return next(errorHandler(403, 'Forbidden'));
        const newAccessToken = jwt.sign(
            { id: validUser.id, isAdmin: validUser.isAdmin },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' }
          );
          res.json(newAccessToken)
    }  
    );
}

