import {ProductController} from "./products/product.controller";
import {ProductRepository} from "./products/product.repository";
import {ProductRepositoryFirebase} from "./products/product.repository.firebase";
import {ProductService} from "./products/product.service";
import {ProductControllerFirebase} from "./products/product.controller.firebase";
import {StockRepository} from "./stocks/stock.repository";
import {StockRepositoryFirebase} from "./stocks/stock.repository.firebase";
import {OrderController} from "./orders/order.controller";
import {OrderRepository} from "./orders/order.repository";
import {OrderRepositoryFirebase} from "./orders/order.repository.firebase";
import {OrderService} from "./orders/order.service";
import {OrderControllerFirebase} from "./orders/order.controller.firebase";

export class DependencyFactory{
  getProductController(): ProductController{

    const repo: ProductRepository = new ProductRepositoryFirebase();
    const sRepo: StockRepository = new StockRepositoryFirebase();
    const service: ProductService = new ProductService(repo, sRepo);
    return new ProductControllerFirebase(service);

  }

  getOrderController(): OrderController{
    const orderRepo: OrderRepository = new OrderRepositoryFirebase();
    const stockRepo: StockRepository = new StockRepositoryFirebase();
    const service: OrderService = new OrderService(stockRepo, orderRepo);
    return new OrderControllerFirebase(service);
  }
}
