import { Response } from "express";

export class BaseController {
  
  jsonRes(doc: any, res: Response) {
    res.status(200).json(doc);
  }

  errRes(res: Response, message : string = "Une erreur est survenue",status : number = 500) {
    res.status(status).json(message);
  }
  
}
