import express = require("express");
import { Response, Request} from "express";
export const routerTemplate = express.Router();

import {
  calculationController,
} from "../controllers/controllers.module";


routerTemplate.post(
  "/calculate",
  (req : Request, res : Response) => {
    calculationController.calculate(req, res);
  }
);

