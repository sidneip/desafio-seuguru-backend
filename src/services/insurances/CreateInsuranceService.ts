import { prisma } from "../../database/prismaClient";

interface ICoverage {
  name: string;
  fator: number;
}
interface ICreateInsurance {
  name: string;
  coverages?: ICoverage[] | undefined;
}
class CreateInsuranceService {
  name: string;
  coverages: ICoverage[] | undefined;
  constructor({ name, coverages }: ICreateInsurance) {
    this.name = name;
    this.coverages = coverages;
  }

  async execute(): Promise<any> {
    const insurance = await prisma.insurance.create({
      data: {
        name: this.name,
        coverages: {
          create: this.coverages,
        },
      },
      include: {
        coverages: true,
      },
    });
    return insurance;
  }
}

export { CreateInsuranceService };
