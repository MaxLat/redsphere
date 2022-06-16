import { BaseController } from "./baseController";
import { Response, Request, NextFunction } from "express";
import { CalculationService } from "../services/calculationService";


export class CalculationController extends BaseController {

  constructor(private calculationService : CalculationService) {
    super();
  }

  async calculate(req: Request, res: Response) {
    try {
      
      const listCalcul = [
        "-5--3", // -2
        "-5-3", // -8
        "-5.4 - 2.4", // -7.8
        "5 +5", // return 10
        "5 * 3(5 *2)", // 150
        "5.2 * 3.4 + 23.5", // 41.18,
        "6 / 3", // return 2
        "5 * 4 / 2 - 4", // return 6
        "3(12/2)+6", // return 24
        "3.5*(12.5/4.3 * (3.5 * 5))", // return 178.05
        "-8(-12 + 5 * -3.5) / 2.6" // return 90.76
      ];

      listCalcul.forEach(calcul => {

        calcul = calcul.replace(/\s/g, '');
        console.log(this.calculationService.calculateString(calcul));
    })

      this.jsonRes("votre post a bien été enregistré ", res);
    } catch (error: any) {
      this.errRes(res, "une erreur est survenue");
    }
  }

}
