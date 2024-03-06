import { Router } from "express";
import loginController from "./controller";

const loginRouter = Router();

loginRouter.post("/", loginController.login);
loginRouter.post("/token", loginController.token);

export default loginRouter;
