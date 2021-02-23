import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-burgers',
  templateUrl: './burgers.component.html',
  styleUrls: ['./burgers.component.scss'],
})
export class BurgersComponent implements OnInit {
  products: Array<IProduct> = [];
  currentCategory: string;
  subscription: Subscription;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private basketService: BasketService
  ) {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     const NAME_CATEGORY = this.activateRoute.snapshot.paramMap.get(
    //       'category'
    //     );
    //     this.getProducts(NAME_CATEGORY);
    //   }
    // });
  }

  ngOnInit(): void {}

  private getProducts(categoryName: string): void {
    this.products = [];
    this.apiService
      .getFireCloudCategoryProducts(categoryName)
      .onSnapshot((document) => {
        document.forEach((prod) => {
          const product = {
            id: prod.id,
            ...prod.data(),
          };
          this.products.push(product);
          this.currentCategory = this.products[0].category.name;
        });
      });
  }

  addBasket(product: IProduct): void {
    this.basketService.addBasket(product);
  }
}
