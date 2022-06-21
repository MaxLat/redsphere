import { BaseController } from "./baseController";
import { Response, Request } from "express";
import { CalculationService } from "../services/calculationService";

export class CalculationController extends BaseController {
    constructor(private calculationService: CalculationService) {
        super();
    }

    async calculate(req: Request, res: Response) {
        try {
            let calcul = req.body.calcul;
            calcul = calcul.replace(/\s/g, "");
            const responseCalcul = this.calculationService.calculateString(calcul);
            this.jsonRes(responseCalcul, res);
        } catch (error: any) {
            console.log(error);
            this.errRes(res, "error");
        }
    }
}
