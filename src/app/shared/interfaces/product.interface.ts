import { ICategory } from "./category.interface";

export interface IProduct {
  name: string;
  urlName: string;
  category: ICategory;
  price: number;
  count: number;
  img: string;
  id?: string;
}