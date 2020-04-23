import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {AddProduct} from "../../actions/product.action";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store/*private productService: ProductService */, private router: Router) { }

  ngOnInit() {
    this.productGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

// Getters for easy access to form fields
  get name() { return this.productGroup.get('name'); }
  get price() { return this.productGroup.get('price'); }
  get weight() { return this.productGroup.get('weight'); }


  add(){
    this.store.dispatch(new AddProduct({name: this.name.value, price: this.price.value, weight: this.weight.value}));
    this.router.navigateByUrl('/products');
  }
}
