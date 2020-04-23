import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Product} from "../functions/src/models/product";


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private angFirestore: AngularFirestore) { }


   createProduct(payload: Product): any {
      const uid = this.angFirestore.createId();
      return this.angFirestore.collection<Product>("products").doc(uid).set({
        name: payload.name,
        uid: uid,
        price: payload.price,
        weight: payload.weight
      })
    }

  /*
  createProduct(data) {
    return new Promise<any>((resolve, reject) => {
      const uid = this.angFirestore.createId();
      this.angFirestore.collection<Product>("products").doc(uid).set({
        name: data.name,
        uid: uid,
        price: data.price,
        weight: data.weight
      }).then(res => {},err => reject(err));
    })
  }
   */

  getProducts(): Observable<Product[]> {
      return this.angFirestore.collection<Product>("products").valueChanges();
  }

  updateProduct(product): any {
    const productRef: AngularFirestoreDocument<Product> = this.angFirestore.doc(`products/${product.uid}`);
    const data = {
      name: product.name,
      uid: product.uid,
      price: product.price,
      weight: product.weight
    }
    return productRef.set(data, { merge: true })
  }

  deleteProduct(productUid: string): any{
    this.angFirestore.doc<Product>('products/'+productUid).delete();
  }

}
