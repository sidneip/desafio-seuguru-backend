import { Request, Response } from "express";
import { SimulateService } from "../services/insurances/SimulateService";

class SimulatorController {
  public static async create(request: Request, response: Response) {
    const { insurance_id } = request.params;
    const { coverages } = request.body;
    const simulate = await new SimulateService(
      insurance_id,
      coverages
    ).execute();
    return response.json(simulate);
  }
}

export { SimulatorController };
