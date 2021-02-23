import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  view: IProduct;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    const NAME_PRODUCT = this.activatedRoute.snapshot.paramMap.get('name');
    this.apiService
      .getFireCloudOneProduct(NAME_PRODUCT)
      .onSnapshot((document) => {
        document.forEach((prod) => {
          const product = {
            id: prod.id,
            ...prod.data(),
          };
          this.view = product;
        });
      });
  }

  addBasket(product: IProduct): void {
    this.basketService.addBasket(product);
  }
}
