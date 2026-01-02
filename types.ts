
export enum Tab {
  INICIO = 'INICIO',
  TIENDA = 'TIENDA',
  FINANZAS = 'FINANZAS',
  HERRAMIENTAS = 'HERRAMIENTAS',
  NAUTA = 'NAUTA'
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  category: 'Llamada' | 'Datos' | 'SMS' | 'Recarga';
}

export interface Package {
  id: string;
  name: string;
  price: number;
  validity: string;
  benefits: string[];
  type: 'Datos' | 'Voz' | 'SMS' | 'Combinados';
}
