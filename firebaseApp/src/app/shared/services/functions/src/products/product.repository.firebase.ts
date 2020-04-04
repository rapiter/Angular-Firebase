import {ProductRepository} from "./product.repository";
import * as admin from "firebase-admin";
import {Stock} from "../models/stock";

export class ProductRepositoryFirebase implements ProductRepository{
  productStockPath = 'stock'
  setDefaultStock(prodId:string, stock: Stock): Promise<any> {
    return this.db().doc(`${this.productStockPath}/${prodId}`).set(stock);
  };

  db(): FirebaseFirestore.Firestore{
    return admin.firestore();
  }

  /*
  buyItem(orderId: string): Promise<any> {
    this.db().doc(`orders/${orderId}`).collection(`orderlines`).doc('cQxLrXSxK4EvnbG3SfbT').set({
      productId: 'cQxLrXSxK4EvnbG3SfbT',
      orderCount: 1
    }).catch(err => console.log(err));

    return this.db().collection(`stock`).doc('cQxLrXSxK4EvnbG3SfbT').get().then(function (doc) {
      const stock = doc.data() as Stock;
      stock.stockCount--;

      admin.firestore().collection(`stock`).doc('cQxLrXSxK4EvnbG3SfbT').update(stock).catch(err => {console.log(err)});
    }).catch(err => console.log(err))
  }

   */

}
