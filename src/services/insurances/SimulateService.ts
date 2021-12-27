import { prisma } from "../../database/prismaClient";
interface ICoverageSimulator {
  id: string;
  capital: number;
}

interface ISimulateService {
  insurance_id: string;
  coverages: ICoverageSimulator[];
}

class SimulateService {
  constructor(
    public insurance_id: string,
    public coverages: ICoverageSimulator[]
  ) {}

  async execute(): Promise<any> {
    const insurance = await prisma.insurance.findUnique({
      where: {
        id: String(this.insurance_id),
      },
      include: {
        coverages: true,
      },
    });
    const resultPromises = await this.coverages.map(
      async (coverage: ICoverageSimulator) => {
        return {
          id: coverage.id,
          capital: coverage.capital,
          premio: await this.calculatePremium(coverage.id, coverage.capital),
        };
      }
    );
    const promises = Promise.all(resultPromises);
    const result = await promises;
    return result;
  }

  private async calculatePremium(id: string, capital: number): Promise<number> {
    const coverage = await prisma.coverages.findUnique({
      where: { id: id },
    });
    if (coverage) {
      const premium = coverage?.fator * capital;
      return premium;
    } else {
      return 0;
    }
  }
}

export { SimulateService };
