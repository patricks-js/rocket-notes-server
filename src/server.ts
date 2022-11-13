import "dotenv/config";
import "express-async-errors";

import cors from "cors";
import { env } from "process";

import express from "express";

import { CatchErrors } from "./middleware/CatchErrors";
import { routes } from "./routes/index";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(CatchErrors);

const PORT = env.PORT || env.DEV_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
