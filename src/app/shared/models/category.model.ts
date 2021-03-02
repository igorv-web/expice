import { ICategory } from '../interfaces/category.interface';

export class Category implements ICategory {
  constructor(public name: string, public urlName: string) {}
}
