import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BurgersComponent } from './pages/burgers/burgers.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { BasketComponent } from './pages/basket/basket.component';
import { SaladsComponent } from './pages/salads/salads.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'burgers', component: BurgersComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'salads', component: SaladsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'admin-category', component: AdminCategoryComponent },
    { path: 'admin-product', component: AdminProductComponent },
    { path: 'admin-blog', component: AdminBlogComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
