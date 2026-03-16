import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import CONFIG from "../config";
import { JwtUserPayload } from "../types/jwt";

dotenv.config();

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, CONFIG.JWT_SECRET!, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user as JwtUserPayload;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default authenticateToken;
