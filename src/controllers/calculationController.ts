import { BaseController } from "./baseController";
import { Response, Request, NextFunction } from "express";


export class CalculationController extends BaseController {

  constructor() {
    super();
  }

  async calculate(req: Request, res: Response) {
    try {
      this.jsonRes("votre post a bien été enregistré ", res);
    } catch (error: any) {
      this.errRes(res, "une erreur est survenue");
    }
  }

}
