import {StockRepository} from "./stock.repository";
import {Stock} from "../models/stock";
import {Product} from "../models/product";
import * as admin from "firebase-admin";
import {Orderline} from "../models/orderline";
import DocumentData = admin.firestore.DocumentData;
import DocumentReference = admin.firestore.DocumentReference;


export class StockRepositoryFirebase implements StockRepository {

  createStock(product: Product): Stock {
    const stock: Stock = {
      uid: product.uid,
      productName: product.name,
      stockCount: 5
    }
    return stock;
  }

  db(): FirebaseFirestore.Firestore{
    return admin.firestore();
  }

  updateProduct(prodId: string, productAfter: Product): Promise<any> {
    return admin.firestore().doc(`stock/${prodId}`).get().then(function (doc) {
      const stock = doc.data() as Stock;
        if (productAfter.name != null) {
          stock.productName = productAfter.name;
        }

      admin.firestore().doc(`stock/${prodId}`).update(stock).catch(err => console.log(err));
    });
  }

  lowerStockCount(productId: string, count: number): Promise<any> {
    return this.db().collection(`stock`).doc(productId).get().then(function (doc) {
      const stock = doc.data() as Stock;
      stock.stockCount = stock.stockCount - count;

      admin.firestore().collection(`stock`).doc(productId).update(stock).catch(err => {console.log(err)});
    }).catch(err => console.log(err))
  }

  async lowerMultipleStockCount(orderLines: Orderline[]): Promise<any> {
    const batch = this.db().batch();
    const documentsArray: DocumentReference<DocumentData>[] = [];
    orderLines.forEach(ol => {
      documentsArray.push(this.db().collection(`stock`)
        .doc(ol.productId));
    });
    const stocks = await this.db().getAll(...documentsArray);
    stocks.forEach(snap => {
      const stock = snap.data() as Stock;
      orderLines.forEach(ol => {
        if(ol.productId === snap.id) {
          stock.stockCount = stock.stockCount - ol.count;
        }
      });
      batch.set(this.db().collection(`stock`)
        .doc(`${snap.id}`), stock);
    });
    await batch.commit();
    return Promise.resolve();
  }
}
