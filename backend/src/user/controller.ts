import { Request, Response, NextFunction } from "express";
import service from "./service";
import getTokenParameter from "../auth/getTokenParameter";

const controller = {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await service.findUserByEmail(request.body.email);
      if (user) {
        return response
          .status(409)
          .send({ message: `E-Mail ${request.body.email} already exists` });
      } else {
        await service.create(request.body);
        response.status(201).send({
          status: "success",
          data: request.body.email,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  },
  async getOne(request: Request, response: Response) {
    try {
      const user_token = getTokenParameter(request);
      const user = await service.getOne(user_token.userid);
      response.json(user);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ error: error.message });
      } else {
        response.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = getTokenParameter(request);
      const user = await service.update(user_token.userid, request.body);

      response.status(201).send({
        status: "success",
        data: user,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  },
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = getTokenParameter(request);
      const user = await service.delete(user_token.userid);

      response.status(201).send({
        status: "success",
        data: user,
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error("An unknown error occurred"));
      }
    }
  },
};

export default controller;
