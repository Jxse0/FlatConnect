import express from "express";
import controller from "./controller";
import { authenticateToken } from "../auth/authenticateToken";

const app = express.Router();

app.get("/", authenticateToken, controller.getOne);
app.post("/", controller.create);
app.put("/", authenticateToken, controller.update);
app.delete("/", authenticateToken, controller.delete);
app.put("/follow", authenticateToken, controller.followUser);
app.put("/unfollow", authenticateToken, controller.unfollowUser);
app.get("/followers", authenticateToken, controller.getFollowers);
app.get("/following", authenticateToken, controller.getFollowing);

export default app;
