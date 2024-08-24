import { JWT_SECRET } from '@/config/variable';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const authenticate = (req: any, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'Server configuration error' });
      }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as unknown as { id: number };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
