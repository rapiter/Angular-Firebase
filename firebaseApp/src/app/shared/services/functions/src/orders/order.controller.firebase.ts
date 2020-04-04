import {OrderController} from "./order.controller";
import {OrderService} from "./order.service";
import {EventContext} from "firebase-functions";
import {Order} from "../models/order";

export class OrderControllerFirebase implements OrderController{
  constructor(private orderService: OrderService){

  }

  placeOrder(snap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>, context: EventContext): Promise<Order> {
    const order = snap.data() as Order;
    order.uId = context.params.orderId;
    return this.orderService.buyItem(order)
  }

}
