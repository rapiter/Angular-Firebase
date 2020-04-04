import {IMock, It, Mock, Times} from "moq.ts";
import {ProductRepository} from "../src/products/product.repository";
import {ProductService} from "../src/products/product.service";
import {Product} from "../src/models/product";
//import {Stock} from "../src/models/stock";
import {StockRepository} from "../src/stocks/stock.repository";

describe('ProductService', () => {
  let productRepository: IMock<ProductRepository>;
  let stockRepository: IMock<StockRepository>;
  let productService: ProductService;
  let product: Product = {name: 'Shampoo', price: 29, weight: '1000', uid: '123ab' };
  let productBefore: Product = {name: 'Shampoo', price: 29, weight: '1000', uid: '123ab' };
  let productAfter: Product = {name: 'Shampoo 2', price: 29, weight: '1000', uid: '123ab' };


  beforeEach(() => {
    productRepository = new Mock<ProductRepository>()
      .setup(pr => pr.setDefaultStock(It.IsAny(), It.IsAny()))
      .returns(new Promise((resolve, reject) => {resolve()}));
    stockRepository = new Mock<StockRepository>()
      .setup(sR => sR.createStock(It.IsAny()))
      .returns(new Promise((resolve, reject) => {resolve()}))
      .setup(sR => sR.updateProduct(It.IsAny(),It.IsAny()))
      .returns(new Promise((resolve, reject) => {resolve()}))
    productService = new ProductService(productRepository.object(), stockRepository.object());
  });

  it('creating a product should create a default stock (amount 5)', async () => {
    await productService.setDefaultProductStock(product);
    stockRepository.verify(stockRepository => stockRepository.createStock(product), Times.Exactly(1))
  })

  it('Product Service requires a Stock Repository & Product Repository', async () => {
    const _productService = new ProductService(productRepository.object(),stockRepository.object());
    expect(_productService).toBe(_productService);
  })

  it('Altering a product should call stock repository', async () =>
    {
      await productService.renameProduct(product.uid, productBefore, productAfter);
      stockRepository.verify(stockRepository => stockRepository.updateProduct(product.uid, productAfter), Times.Exactly(1))
    }
  )

});
