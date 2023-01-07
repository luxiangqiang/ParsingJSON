export interface IData {
  capital: string;
  currency: string;
  hireIn: string;
  offical_language: string;
  payroll_cycle: string;
  continent?: string;
  priority?: number;
}

export interface ICountry {
  name: string;
  sourceData: IData;
}
