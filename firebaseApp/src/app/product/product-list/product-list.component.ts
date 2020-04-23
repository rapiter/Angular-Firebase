import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/services/product/product.service";
import {Observable} from "rxjs";
import {Product} from "../../shared/services/functions/src/models/product";
import {Select, Store} from "@ngxs/store";
import {DeleteProduct, GetProducts, SetSelectedProduct} from "../../actions/product.action";
import {ProductState} from "../../states/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.getProducts) products: Observable<Product[]>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.products = this.store.dispatch(new GetProducts())
  }

  deleteProduct(id: string){
    this.store.dispatch(new DeleteProduct(id))
  }

  setSelectedProduct(product: Product){
    this.store.dispatch(new SetSelectedProduct(product));
    this.router.navigateByUrl("/product-edit");
  }




}
