import { createReducer, on } from "@ngrx/store";
import Product from "../../shared/interfaces/product";
import { addToCart, decrementProduct, incrementProduct, removeItem } from "./cart.action";

export interface cartState{
    products:Product[];
}
let storedCart
if (typeof window !== 'undefined') {
  storedCart = localStorage.getItem('cart');
}
export const intialCartEntries: cartState = {
    products:storedCart ? JSON.parse(storedCart) : []
}

export const cartReducer = createReducer(
    intialCartEntries,
  
    on(addToCart, (state, {product}) => {
      const updateProduct = [...state.products,product]
      localStorage.setItem('cart', JSON.stringify(updateProduct))
      return {
        ...state,
        products:updateProduct
      };  
    }),

    on(removeItem, (state, { productId }) => {
        const updatedProducts = state.products.filter(
          (product) => {
            console.log(product._id);
            
            return product._id !== productId
          }
        );
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        return {
          ...state,
          products: updatedProducts,
        
        };
    }),
    on(incrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) =>{
            if(product._id === productId && product.quantity<product.stock){
                return { ...product, quantity: product.quantity + 1 }
            }else{
                return product
            }
        }
        );
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        return {
          ...state,
          products: updatedProducts,
        };
      }),
      on(decrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) =>{
            if(product._id === productId && product.quantity>1){
                return { ...product, quantity: product.quantity - 1 }
            }else{
                return product
            }
        }
        );
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        return {
          ...state,
          products: updatedProducts,
        };
      })
  
   
  )