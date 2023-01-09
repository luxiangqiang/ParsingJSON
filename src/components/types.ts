export interface IData {
  capital: string;
  currency: string;
  hireIn: string;
  offical_language: string;
  payroll_cycle: string;
  necessary_benefits?: { image: string; title: string }[];
  quickStartGuide?: object;
  continent?: number;
  priority?: number;
}
export interface ICountry {
  name: string;
  sourceData: IData;
}
export interface ISaveCountry { 
  name: String;
  title: String;
  benefits: String[];
  capital: String;
  currency: String;
  officialLanguage: String;
  payrollCycle: String;
  priority: Number;
  quickStartGuide: Record<string, any>;
  area: number;
}

