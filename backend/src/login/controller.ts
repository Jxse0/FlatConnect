import { Request, Response } from "express";
import userService from "../user/service";
import bcrypt from "bcrypt";
import service from "./service";

const refreshTokens: string[] = [];

const loginController = {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return response
          .status(400)
          .send({ status: "Error", message: "No User found!" });
      }

      if (await bcrypt.compare(password, user.password)) {
        const jwtAuth = service.login(user.id);
        if (jwtAuth.token) {
          response.status(200).send(jwtAuth);
        } else {
          response
            .status(400)
            .send({ status: "Error", message: "Bad Request" });
        }
      } else {
        response.status(403).send({
          status: "Error",
          message: "Username or password does not match!",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send({ status: "Error", message: error.message });
      } else {
        response
          .status(500)
          .send({ status: "Error", message: "An unknown error occurred" });
      }
    }
  },

  async token(request: Request, response: Response) {
    const refreshToken = request.body.token;

    if (refreshToken == null) {
      return response.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
      return response.sendStatus(403);
    }

    try {
      const accessToken = service.token(refreshToken);
      response.json({ token: accessToken });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send({ status: "Error", message: error.message });
      } else {
        response
          .status(500)
          .send({ status: "Error", message: "An unknown error occurred" });
      }
    }
  },
};

export default loginController;
