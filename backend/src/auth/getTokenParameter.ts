import { Request } from "express";

export default function returnUser(request: Request) {
  const token = request.headers.authorization?.split(" ")[1];

  if (typeof token === "string") {
    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    return user;
  }
}
