import {Stock} from "../models/stock";

export interface ProductRepository {
  setDefaultStock(prodId: string, stock: Stock): Promise<any>;
  //buyItem(order: Order): Promise<any>;
}
