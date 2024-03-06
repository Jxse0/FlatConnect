import express from "express";
import controller from "./controller";

const app = express.Router();

app.get("/", controller.getOne);
app.post("/", controller.create);
app.put("/", controller.update);
app.delete("/", controller.delete);

export default app;
