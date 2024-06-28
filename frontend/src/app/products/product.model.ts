export interface Product {
  id?: number;
  code: string;
  description: string;
  dateEntry: Date;
  expiration: Date;
  stock: number;
}
