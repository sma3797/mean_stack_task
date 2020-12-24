import { Component } from '@angular/core';
import { Product } from './models/Product'

import {ProductsService} from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Dragon - MEAN Stack Task';
  products:Product[] | undefined

  constructor (private productsService:ProductsService){
     this.productsService.getProducts({ query: "" }, 0).subscribe(products => {
      this.products = [...products.products]
    })
  }

  onChange():void {
    console.log('e')
  }
  

}
