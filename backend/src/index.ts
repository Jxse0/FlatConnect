import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.listen(3001, () =>
  console.log("Flatconnect Backend is ready for operations")
);
