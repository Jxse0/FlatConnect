import express from "express";
import cors from "cors";
import userRouter from "./user/index";
import loginRouter from "./login";
import followRouter from "./follow";

const app = express();
app.use(express.json());

app.use(cors());
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/follow", followRouter);

app.listen(3001, () =>
  console.log("Flatconnect Backend is ready for operations")
);
