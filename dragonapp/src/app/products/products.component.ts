import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../products.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ngOnInit(): void {
  }

  timer:any = null;
  products:any = [];
  query:any = "";
  skip:any = 0;
  loading:boolean = false;

  constructor(private productsService: ProductsService) {
    this.loading = true;
    this.productsService.getProducts({ query: this.query }, this.skip).subscribe(products => {
      this.products = [this.products, ...products.products].splice(1);
      this.loading = false;
    })
  }

  loadMore(): void {
    this.loading = true;
    const tempLength = this.products?.length
    this.productsService.getProducts({ query: this.query }, tempLength).subscribe(products => {
      const tempProducts = [...this.products] 
      this.products = [...tempProducts, ...products.products];
      this.loading = false;
    })
  }

  searchProduct(event:any):void { 
    clearTimeout(this.timer);
    this.loading = true;
    this.timer = setTimeout(() => {
      try {
        this.query =(<HTMLInputElement>event.target).value
        this.productsService.getProducts({ query: event.target.value }, 0).subscribe(products => {
          this.products = [...products.products];
          this.loading = false;
        })
			} catch (err) {}
		}, 500);
  }

}
