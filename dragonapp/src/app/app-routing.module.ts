import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '' , component:ProductsComponent},
  { path: 'product/:id' , component:ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
