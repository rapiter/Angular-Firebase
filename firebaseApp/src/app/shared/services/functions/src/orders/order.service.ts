import {StockRepository} from "../stocks/stock.repository";
import {Order} from "../models/order";
import {OrderRepository} from "./order.repository";

export class OrderService{

  constructor(private stockRepository: StockRepository, private orderRepository: OrderRepository){
    console.log(this.orderRepository);
  }


  async buyItem(order: Order): Promise<Order>{
    order.orderLines.length <= 1 ?
      await this.stockRepository.lowerStockCount(order.orderLines[0].productId, order.orderLines[0].count):
      await this.stockRepository.lowerMultipleStockCount(order.orderLines);

    return Promise.resolve(order);
  }
}
