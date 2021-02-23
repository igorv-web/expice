import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  totalPayment: string;
  userComment: string;
  totalPrice = 0;
  basket: Array<IProduct> = [];
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.getLocalBasket();
  }

  private getLocalBasket(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.getTotalPrice(this.basket);
    }
  }

  checkUpdateProduct(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.basketService.checkBasket.next(true);
    this.getTotalPrice(this.basket);
  }

  private getTotalPrice(basket: Array<IProduct>): void {
    if (basket) {
      this.totalPrice = this.basket.reduce(
        (total, prod) => total + prod.price * prod.count,
        0
      );
    } else {
      this.totalPrice = 0;
    }
  }

  removeProduct(product: IProduct): void {
    const index = this.basket.findIndex((prod) => prod.id === product.id);
    this.basket.splice(index, 1);
    this.getTotalPrice(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.basketService.checkBasket.next(true);
  }
}
