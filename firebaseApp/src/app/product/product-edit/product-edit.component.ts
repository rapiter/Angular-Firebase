import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {ProductState} from "../../states/product.state";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../shared/product";
import {SetSelectedProduct, UpdateProduct} from "../../actions/product.action";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @Select(ProductState.getSelectedProduct) selectedProduct: Observable<Product>;
  productGroup: FormGroup;
  productId: string;
  private formSubscription: Subscription = new Subscription();


  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router) {
    this.productGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      uid: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formSubscription.add(this.selectedProduct.subscribe(product => {
      this.productId = product.uid;
      if(product) {
        this.productGroup.patchValue({
          name: product.name,
          uid: product.uid,
          price: product.price,
          weight: product.weight
        })
      }
    }))
  }

  onSubmit(){
    this.formSubscription.add(this.store.dispatch(new UpdateProduct(this.productGroup.value, this.productGroup.value.id)).subscribe(()=>{
      this.productGroup.reset();
      this.store.dispatch(new SetSelectedProduct(null));
    }))
    this.router.navigateByUrl("/products")
  }


}
