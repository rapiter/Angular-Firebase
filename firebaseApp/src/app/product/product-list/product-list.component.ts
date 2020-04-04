import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/services/product/product.service";
import {Observable} from "rxjs";
import {Product} from "../../shared/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }




}
