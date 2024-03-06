import { Request, Response, NextFunction } from "express";
import service from "./service";
import getTokenParameter from "../auth/getTokenParameter";

const controller = {
  async followUser(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = getTokenParameter(request);
      const username2follow = request.body.username2follow;
      const user = await service.followUser(user_token.userid, username2follow);

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

  async unfollowUser(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = getTokenParameter(request);
      const username2unfollow = request.body.username2unfollow;
      const user = await service.unfollowUser(
        user_token.userid,
        username2unfollow
      );

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
  async getFollowers(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = getTokenParameter(request);
      const user = await service.getFollowers(user_token.userid);

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

  async getFollowing(request: Request, response: Response, next: NextFunction) {
    try {
      const user_token = getTokenParameter(request);
      const user = await service.getFollowing(user_token.userid);

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
