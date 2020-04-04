import {IMock, It, Mock, Times} from "moq.ts";
import {StockRepository} from "../src/stocks/stock.repository";
import {OrderRepository} from "../src/orders/order.repository";
import {OrderService} from "../src/orders/order.service";
import {Orderline} from "../src/models/orderline";
import {Order} from "../src/models/order";

describe('OrderService', () => {
  let stockRepository: IMock<StockRepository>;
  let orderRepository: IMock<OrderRepository>;
  let orderService: OrderService;
  let orderLine1: Orderline = {
    uId: "orderLine1",
    productId: "Shampoo",
    count: 1
  };
  let orderLine2: Orderline = {
    uId: "orderLine2",
    productId: "Coffee",
    count: 3
  };

  let order1: Order = {
    uId: "order1",
    orderLines: [orderLine1]
  };

  let order2: Order = {
    uId: "order2",
    orderLines: [orderLine1, orderLine2]
  };
  beforeEach(() => {
    stockRepository = new Mock<StockRepository>()
      .setup(stockRepository => stockRepository.lowerStockCount(It.IsAny(),It.IsAny()))
      .returns(new Promise((resolve, reject) => {resolve()}))
      .setup(stockRepository => stockRepository.lowerMultipleStockCount(It.IsAny()))
      .returns(new Promise((resolve, reject) => {resolve()}));
    orderRepository = new Mock<OrderRepository>()
      .setup(orderRepository => orderRepository.buyItem(It.IsAny()))
      .returns(new Promise((resolve, reject) => {resolve()}));
    orderService = new OrderService(stockRepository.object(),orderRepository.object());
  });

  it('Placing an order with a product amount higher than one, should decrease count of all products', async () => {
    await orderService.buyItem(order2);
    stockRepository.verify(stockRepository => stockRepository.lowerMultipleStockCount(order2.orderLines), Times.Exactly(1))
  })

  it('Placing an order with a product amount of one, should only decrease count of that exact product', async () => {
    await orderService.buyItem(order1);
    stockRepository.verify(stockRepository => stockRepository.lowerStockCount(order1.orderLines[0].productId,1), Times.Exactly(1))
  })

});
