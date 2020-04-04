import {ProductRepository} from "./product.repository";
import {Product} from "../models/product";
import {Stock} from "../models/stock";
import {StockRepository} from "../stocks/stock.repository";

export class ProductService {
  constructor(private productRepository: ProductRepository, private stockRepository: StockRepository) {

  }

/*
  buyItem(orderId: string): Promise<any>{
    return this.productRepository.buyItem(orderId);
  }

 */



  async setDefaultProductStock(
    product: Product
  ): Promise<Stock> {
    const stock: Stock = this.stockRepository.createStock(product);
    await this.productRepository.setDefaultStock(product.uid, stock);
    return Promise.resolve(stock);
  }

  renameProduct(prodId: string, productBefore: Product, productAfter: Product): Promise<void> {
    return this.stockRepository.updateProduct(prodId, productAfter);

  }


}



