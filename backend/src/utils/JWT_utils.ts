// import { Request, Response, NextFunction } from "express";
// import { VerifyErrors } from "jsonwebtoken";
// const { jwt, JwtPayload } = require("jsonwebtoken");
// const IUser = require("../models/User");
// require("dotenv").config({ path: "./src/.env" });

// interface AuthenticatedRequest extends Request {
//   user?: typeof JwtPayload | string;
// }

// export function GenerateAccsessToken(user: InstanceType<typeof IUser>): string {
//   if (!process.env.ACCESS_TOKEN_SECRET) {
//     throw new Error(
//       "ACCESS_TOKEN_SECRET is not defined in environment variables."
//     );
//   }
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5s" });
// }
// export function GenerateRefreshToken(user: InstanceType<typeof IUser>): string {
//   if (!process.env.REFRESH_TOKEN_SECRET) {
//     throw new Error(
//       "REFRESH_TOKEN_SECRET is not defined in environment variables."
//     );
//   }
//   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
// }

// // function authenticateTokenVerify(
// //   req: AuthenticatedRequest,
// //   res: Response,
// //   next: NextFunction
// // ): void {
// //   const authHeader = req.headers["authorization"];

// //   const token = authHeader && authHeader.split(" ")[1];
// //   if (token == null) {
// //     res
// //       .sendStatus(401)
// //       .json({ message: "Token is missing, authorization denied." });
// //     return;
// //   }

// //   jwt.verify(
// //     token,
// //     process.env.ACCESS_TOKEN_SECRET as string,
// //     (error: typeof jwt.VerifyErrors, user: typeof JwtPayload | string) => {
// //       //user obtinut din
// //       //decodificarea tokenuluii si se obtine payloadul original
// //       //cu care a fost codificat unde exista userul si parola
// //       if (error) {
// //         //has a token but has no longer acccess
// //         res.sendStatus(403);
// //         return;
// //       }
// //       // console.log(user.email);
// //       req.user = user;
// //       next();
// //     }
// //   );
// // }

// export function authenticateTokenVerify(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ): void {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     res
//       .status(401)
//       .json({ message: "Token is missing, authorization denied." });
//     return;
//   }

//   jwt.verify(
//     token,
//     process.env.ACCESS_TOKEN_SECRET as string,
//     (error: VerifyErrors | null, user: JwtPayload | string) => {
//       if (error) {
//         return res
//           .status(403)
//           .json({ message: "Token is invalid or expired." });
//       }

//       req.user = user;
//       next();
//     }
//   );
// }
// module.exports = {
//   GenerateAccsessToken,
//   GenerateRefreshToken,
//   authenticateTokenVerify,
// };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

function GenerateAccessToken(user: InstanceType<typeof User>): string {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables."
    );
  }
  // Creăm un payload cu informațiile relevante
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
  // Creăm un payload cu informațiile relevante
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
      .status(401)
      .json({ message: "Token is missing, authorization denied." });
    return;
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  (req as AuthenticatedRequest).user = decoded;

  next();
}

export { GenerateAccessToken, GenerateRefreshToken, authenticateTokenVerify };
