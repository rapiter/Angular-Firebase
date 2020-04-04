import {Order} from "../models/order";

export interface OrderRepository{

  buyItem(order: Order): Promise<any>;

}
