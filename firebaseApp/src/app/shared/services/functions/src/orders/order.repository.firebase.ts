import {OrderRepository} from "./order.repository";
import {Order} from "../models/order";
import * as admin from "firebase-admin";

export class OrderRepositoryFirebase implements OrderRepository{

  db(): FirebaseFirestore.Firestore{
    return admin.firestore();
  }

  buyItem(order: Order): Promise<any> {
    return this.db().doc(`orders/${order.uId}`).create(order);

  }


}
