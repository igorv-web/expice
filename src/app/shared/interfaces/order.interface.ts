import { IProduct } from "./product.interface";

export interface IOrder {
  products: Array<IProduct>;
  adress: string;
  name: string;
  phone: string;
  payment: string;
}