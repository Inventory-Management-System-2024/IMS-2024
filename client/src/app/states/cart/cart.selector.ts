import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { cartState } from "./cart.reducer";

export const selectCartState = (state:AppState) => state.cart

export const selectCartProducts = createSelector(
    selectCartState,
    (state:cartState)=> state.products
)

export const selectCountProducts = createSelector(
    selectCartState,
    (state:cartState) => {
      return state.products.length;
    }
);

 export const selectTotalPrice = createSelector(
    selectCartState,
    (state: cartState) => {
      return state.products.reduce((totalPrice, product) => {
          return totalPrice + (product.price * product.quantity);
      }, 0);
  }
)