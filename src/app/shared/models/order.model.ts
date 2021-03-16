import { IOrder } from "../interfaces/order.interface";

export class Order implements IOrder {
  constructor(
    public products: Array<any>,
    public adress: string,
    public name: string,
    public phone: string,
    public payment: string
  ){}
}