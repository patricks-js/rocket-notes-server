import "dotenv/config";
import "express-async-errors";

import { env } from "process";

import express from "express";


const app = express();


const PORT = env.PORT || env.DEV_PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));