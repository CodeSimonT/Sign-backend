import express from "express";
const route = express.Router();

import { signup, signin } from "../controllers/controller.js";

route.post("/signup", signup);
route.post("/signin", signin);

export default route;
