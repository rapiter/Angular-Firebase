import {Product} from "../models/product";
import {Stock} from "../models/stock";
import {Orderline} from "../models/orderline";

export interface StockRepository {
  createStock(product: Product): Stock
  updateProduct(prodId: string, productAfter: Product): Promise<any>;
  lowerStockCount(productId: string, count: number): Promise<any>;
  lowerMultipleStockCount(orderLines: Orderline[]): Promise<any>;


}
