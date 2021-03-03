import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];
  subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const NAME_CATEGORY = this.route.snapshot.paramMap.get('category');
        this.getProducts(NAME_CATEGORY);
      }
    });
  }

  ngOnInit(): void {
    this.getProducts(this.route.snapshot.paramMap.get('category'));
  }

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
        });
      });
  }
}
