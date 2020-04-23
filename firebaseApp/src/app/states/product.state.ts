import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Product} from "../shared/services/functions/src/models/product";
import {AddProduct, DeleteProduct, GetProducts, SetSelectedProduct, UpdateProduct} from "../actions/product.action";
import {ProductService} from "../shared/services/product/product.service";
import {Injectable} from "@angular/core";

export class ProductStateModel {
  products: any[];
  selectedProduct: Product

}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
    selectedProduct: null
  }
})

@Injectable()
export class ProductState {

  constructor(private productService: ProductService) {
  }

  @Selector()
  static getProducts(state: ProductStateModel) {
    return state.products
  }

  @Selector()
  static getSelectedProduct(state: ProductStateModel){
    return state.selectedProduct;
  }


  @Action(GetProducts)
  getProducts({getState, setState}: StateContext<ProductStateModel>) {
    return this.productService.getProducts().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        products: result,
      });
    }));
  }

  @Action(AddProduct)
  addProduct({getState, patchState}: StateContext<ProductStateModel>, {payload}: AddProduct) {
    return this.productService.createProduct(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        products: [...state.products,result]
      });
    }));

    }


  @Action(UpdateProduct)
  updateProduct({getState, setState}: StateContext<ProductStateModel>, {payload, id}: UpdateProduct) {
    return this.productService.updateProduct(payload).pipe(tap((result) => {
      const state = getState();
      const productsList = [...state.products];
      const prodIndex = productsList.findIndex(item => item.uid === id);
      productsList[prodIndex] = result;
      setState({
        ...state,
        products: productsList,
      });
    }));
  }


  @Action(DeleteProduct)
  deleteProduct({getState, patchState}: StateContext<ProductStateModel>, {id}: DeleteProduct) {
    return this.productService.deleteProduct(id).pipe(tap(()=> {
      patchState({
        products: getState().products.filter(p => p.uid != id.toString())
      })
    }));



  }

  @Action(SetSelectedProduct)
  setSelectedProduct({getState, setState}: StateContext<ProductStateModel>, {payload}: SetSelectedProduct) {
    const state = getState();
    setState({
      ...state,
      selectedProduct: payload
    });
  }

}
