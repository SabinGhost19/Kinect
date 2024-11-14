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

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
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
  console.log("PAYLOAD.....", payload);
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

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (error: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (error) {
        return res.status(403).json({ message: "Failed to verify token." });
      }

      console.log("DECODED DATA:", decoded);

      if (decoded && typeof decoded !== "string" && "email" in decoded) {
        req.user = {
          id: (decoded as JwtPayload).id as string,
          email: (decoded as JwtPayload).email as string,
        };
      } else {
        res.status(403).json({ message: "Invalid token data." });
        return;
      }

      next();
    }
  );
}

export { GenerateAccessToken, GenerateRefreshToken, authenticateTokenVerify };
