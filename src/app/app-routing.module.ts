import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BasketComponent } from './pages/basket/basket.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserComponent } from './pages/user/user.component';
import { OrderComponent } from './pages/order/order.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { ProfileGuard } from './shared/guards/profile.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'menu/:category', component: ProductsComponent },
  { path: 'menu/:category/:name', component: ProductDetailsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'auth', component: RegistrationComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'user', component: UserComponent, canActivate: [ProfileGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
    { path: 'admin-category', component: AdminCategoryComponent },
    { path: 'admin-product', component: AdminProductComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
