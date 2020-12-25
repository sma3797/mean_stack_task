import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../products.service';
import { Product } from './../models/Product';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:Product = {}
  // productId = "5fe46f44c8eb0b17ccd6632a"

  constructor(private productsService: ProductsService, private route:ActivatedRoute) {
    this.productsService.getProduct({ productId: this.route.snapshot.params['id'] }, ).subscribe(product => {
      // console.log("object", product);
      this.product = product.product
    })
  }

  ngOnInit(): void { }
}
