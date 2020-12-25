import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ngOnInit(): void {
  }

  
  products:any = [];
  query:any = "";
  skip:any = 0;

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts({ query: this.query }, this.skip).subscribe(products => {
      this.products = [this.products, ...products.products].splice(1);
      console.log("object", this.products);
    })
  }

  loadMore(): void {
    console.log(this.query)
    const tempLength = this.products?.length
    this.productsService.getProducts({ query: this.query }, tempLength).subscribe(products => {
      const tempProducts = [...this.products]
      this.products = [...tempProducts, ...products.products];
    })
  }

  searchProduct(event:any):void { 
    this.query =(<HTMLInputElement>event.target).value
    this.productsService.getProducts({ query: event.target.value }, 0).subscribe(products => {
      this.products = [...products.products];
    })
    // const timer = setTimeout(() => {
    //   try {
    //     console.log(event.target.value)
		// 	} catch (err) {}
		// }, 500);
		// return clearTimeout(timer);
  }

}
