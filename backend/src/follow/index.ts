import express from "express";
import controller from "./controller";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();
app.put("/", authenticateToken, controller.followUser);
app.put("/unfollow", authenticateToken, controller.unfollowUser);
app.get("/followers", authenticateToken, controller.getFollowers);
app.get("/following", authenticateToken, controller.getFollowing);

export default app;
