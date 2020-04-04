import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Product} from "../models/product";

export interface ProductController {
  written(snap: DocumentSnapshot, context: EventContext): Promise<Product>;
  //buyItem(snap: DocumentSnapshot, context: EventContext): Promise<void>;

  renameProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;
}
