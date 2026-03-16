import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/index.route";
import errorHandler from "./errors/error-handler";

const app = express();
const port = 3000;

app.use(cors());
dotenv.config();

app.use(express.json());

app.use("/api", apiRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
