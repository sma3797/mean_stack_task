import { Component } from '@angular/core';
import { Product } from './models/Product'

import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Dragon - MEAN Stack Task';
  products: Product[] | undefined;
  query: string = "";
  skip: number = 0;

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts({ query: this.query }, this.skip).subscribe(products => {
      this.products = [this.products, ...products.products].splice(1)
      console.log("object", this.products);
    })
  }

  loadMore(): void {
    // console.log('e', this.products?.length)
    // this.skip = this.products?.length ? undefined : 0;
  }


}
