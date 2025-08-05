import jwt from "jsonwebtoken";

export const generateToken = (payload: any, secret: string) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
