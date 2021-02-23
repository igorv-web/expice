import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  checkBasket: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  addBasket(product: IProduct): void {
    let localBasket: Array<IProduct> = [];
    if (localStorage.getItem('basket')){
      localBasket = JSON.parse(localStorage.getItem('basket'));
      if (localBasket.some(prod => prod.id === product.id)){
        const index = localBasket.findIndex(prod => prod.id === product.id);
        localBasket[index].count += product.count;
      }
      else{
        localBasket.push(product);
      }
    }
    else{
      localBasket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(localBasket));
    product.count = 1;
    this.checkBasket.next(true);
  }

}
