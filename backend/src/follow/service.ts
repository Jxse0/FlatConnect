import { User, CreateUser, ErrorMessage } from "../types";
import db from "../../prisma/db";
import bcrypt from "bcrypt";

const service = {
  async followUser(userid: number, username2follow: string) {
    try {
      const user = await db.user.update({
        where: { id: userid },
        data: {
          following: {
            connect: { username: username2follow },
          },
        },
      });
      await db.$disconnect();
      return user;
    } catch (error) {
      console.error("Error following user:", error);
      await db.$disconnect();
      throw error;
    }
  },
  async unfollowUser(userid: number, username2unfollow: string) {
    try {
      const user = await db.user.findUnique({
        where: { id: userid },
        include: {
          following: true,
        },
      });

      if (
        !user ||
        !user.following.some(
          (followedUser) => followedUser.username === username2unfollow
        )
      ) {
        return { message: "You are not following this user" };
      }
      const updatedUser = await db.user.update({
        where: { id: userid },
        data: {
          following: {
            disconnect: { username: username2unfollow },
          },
        },
      });

      await db.$disconnect();
      return updatedUser;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  },
  async getFollowers(userid: number) {
    try {
      const user = await db.user.findUnique({
        where: { id: userid },
        include: {
          followers: true,
        },
      });
      await db.$disconnect();
      return user;
    } catch (error) {
      console.error("Error getting followers:", error);
      await db.$disconnect();
      throw error;
    }
  },
  async getFollowing(userid: number) {
    try {
      const user = await db.user.findUnique({
        where: { id: userid },
        include: {
          following: true,
        },
      });
      await db.$disconnect();
      return user;
    } catch (error) {
      console.error("Error getting following:", error);
      await db.$disconnect();
      throw error;
    }
  },
};

export default service;
