import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from './models/Product';
import { Observable } from 'rxjs';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  url:string = "https://dragon-task.herokuapp.com/product"
  constructor(private http:HttpClient) { }

  getProducts(body:object, skip:number):Observable<any> {
    return this.http.post<any>(`${this.url}/all-products?skip=${skip}`, body, httpOptions)
  }
}
  