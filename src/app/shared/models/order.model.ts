import { IOrder } from "../interfaces/order.interface";
import { IProduct } from "../interfaces/product.interface";

export class Order implements IOrder {
  constructor(
    public orders: Array<IProduct>,
    public adress: string,
    public name: string,
    public phone: string,
    public payment: string
  ){}
}