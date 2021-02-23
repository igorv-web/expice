import { ICategory } from "../interfaces/category.interface";
import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
  constructor(
      public name: string,
      public urlName: string,
      public category: ICategory,
      public price: number,
      public img: string,
      public count: number = 1
  ){}
}