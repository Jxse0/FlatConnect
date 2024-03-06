import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const token = request.headers.authorization?.split(" ")[1];
  let isValid = false;

  try {
    if (typeof token === "string") {
      const decoded = jwt.verify(token, process.env.SECRET || "");
      isValid = !!decoded;
    }
  } catch (error) {
    console.error(error);
  }
  if (isValid) {
    next();
  } else {
    response.statusCode = 401;
    response.send("Unauthorized");
  }
}

export { authenticateToken };
