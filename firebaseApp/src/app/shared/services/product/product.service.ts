import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Product} from "../../product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private angFirestore: AngularFirestore) { }


  public getProducts(): Observable<Product[]> {
      return this.angFirestore.collection<Product>("products").valueChanges();
  }

}
