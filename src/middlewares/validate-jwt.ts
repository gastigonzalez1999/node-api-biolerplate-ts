import { response, request } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import User from "../entities/user.entity";
const secretOrPrivateKey: Secret = process.env.SECRETORPRIVATEKEY!;

export const validateJwt = async (req = request, res = response, next: () => void) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
    msg: 'There is no token',
    });
  }

  try {
    let uid: string;
    const decoded = jwt.verify(token, secretOrPrivateKey) as string | JwtPayload;

    if (typeof decoded === 'string') {
      uid = decoded;
    } else {
      uid = decoded.uid;
    }

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - user does not exist in database',
      });
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Invalid token - user with false status',
      });
    }

    req.body.user = user;

    next();
  } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: 'Invalid token',
      });
  }
};