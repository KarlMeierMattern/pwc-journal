import jwt from "jsonwebtoken";

// generate token
export const generateToken = (payload: any, secret: string) => {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

// verify token
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
