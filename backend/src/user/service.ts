import { User, CreateUser, ErrorMessage } from "../types";
import db from "../../prisma/db";
import bcrypt from "bcrypt";

const service = {
  async create(user: CreateUser) {
    try {
      user.password = bcrypt.hashSync(user.password, 12);
      const newUser = await db.user.create({
        data: user,
      });
      await db.$disconnect();
      return newUser;
    } catch (e) {
      console.error(e);
      await db.$disconnect();
      process.exit(1);
    }
  },

  async getOne(id: number): Promise<User | ErrorMessage> {
    try {
      const user = await db.user.findUnique({
        where: { id },
      });

      if (!user) {
        return { message: "User not found" };
      }

      return user as User;
    } catch (error) {
      console.error(error);
      return { message: "Error retrieving user" };
    }
  },
  async findUserByEmail(email: string) {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (e) {
      console.error(e);
      throw new Error("Error finding user by email");
    } finally {
      await db.$disconnect();
    }
  },
  async update(userid: number, data: any) {
    try {
      const updatedUser = await db.user.update({
        where: {
          id: userid,
        },
        data: data,
      });
      await db.$disconnect();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      await db.$disconnect();
      throw error;
    }
  },
  async delete(userid: number) {
    try {
      const deletedUser = await db.user.deleteMany({
        where: {
          id: userid,
        },
      });
      await db.$disconnect();
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      await db.$disconnect();
      throw error;
    }
  },

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
