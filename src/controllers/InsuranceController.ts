import { Request, Response, NextFunction } from "express";
import { CreateInsuranceService } from "../services/insurances/CreateInsuranceService";
import { prisma } from "../database/prismaClient";
import { Insurance } from "@prisma/client";
class InsuranceController {
  public static async create(request: Request, response: Response) {
    const { name, coverages } = request.body;
    const insurance = await new CreateInsuranceService({
      name,
      coverages,
    }).execute();
    console.log(insurance);
    response.json(insurance);
  }

  public static async index(request: Request, response: Response) {
    const insurances: Insurance[] = await prisma.insurance.findMany({
      include: {
        coverages: true,
      },
    });
    return response.json(insurances);
  }

  public static async show(request: Request, response: Response) {
    const { id } = request.params;
    console.log(id);
    const insurance = await prisma.insurance.findUnique({
      where: {
        id: String(id),
      },
      include: {
        coverages: true,
      },
    });
    return response.json(insurance);
  }
}

export { InsuranceController };
