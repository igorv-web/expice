import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BasketComponent } from './pages/basket/basket.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserComponent } from './pages/user/user.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'menu/:category', component: ProductsComponent },
  { path: 'menu/:category/:name', component: ProductDetailsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'admin-category', component: AdminCategoryComponent },
    { path: 'admin-product', component: AdminProductComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
