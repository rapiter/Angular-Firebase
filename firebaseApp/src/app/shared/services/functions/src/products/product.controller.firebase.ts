import {ProductController} from "./product.controller";
import {Change, EventContext} from "firebase-functions";
import {Product} from "../models/product";
import {ProductService} from "./product.service";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export class ProductControllerFirebase implements ProductController{
  constructor(private productService: ProductService){

  }

  written(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    const productBefore = snap.data() as Product;
    return this.productService.setDefaultProductStock(productBefore)

  };

  /*
  buyItem(snap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>, context: EventContext): Promise<void> {
    return this.productService.buyItem(context.params.orderId);
  }

   */

  renameProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
    const productBefore = snap.before.data() as Product;
    const productAfter = snap.after.data() as Product;

    return this.productService.renameProduct(context.params.prodId, productBefore, productAfter);
  }
}
