import { Request, Response, NextFunction } from "express";
import jwt, {
  GetPublicKeyOrSecret,
  JwtPayload,
  Secret,
  VerifyErrors,
} from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import { JsonWebKeyInput, PublicKeyInput } from "crypto";

dotenv.config({ path: "./src/.env" });

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

function GenerateAccessToken(user: InstanceType<typeof User> | any): string {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables."
    );
  }
  //create a payload for generting the jwt token

  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5s",
  });
}

function GenerateRefreshToken(user: InstanceType<typeof User>): string {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables."
    );
  }
  //create a payload for generting the jwt token
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

function authenticateTokenVerify(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res
      .status(403)
      .json({ message: "Token is missing, authorization denied." });
    return;
  }

  // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  // (req as AuthenticatedRequest).user = decoded;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as
      | Secret
      | JsonWebKeyInput
      | PublicKeyInput
      | GetPublicKeyOrSecret,
    (error, user) => {
      //user obtinut din
      //decodificarea tokenuluii si se obtine payloadul original
      //cu care a fost codificat unde exista userul si parola
      if (error) {
        //has a token but has no longer acccess
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    }
  );
}

export { GenerateAccessToken, GenerateRefreshToken, authenticateTokenVerify };
