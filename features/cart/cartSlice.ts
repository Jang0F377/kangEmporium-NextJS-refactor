import { CartItem } from "../../typings";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks/hooks";

interface CartState {
  cartItems: Array<CartItem>;
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isInCart = state.cartItems.find(
        (x) => x.product.slug.current === item.product.slug.current
      );
      if (isInCart) {
        console.log(isInCart.quantity);
        isInCart.quantity += 1;
      } else {
        console.log("Is NOT in cart");

        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItemFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const moreThanOne = item.quantity > 1;
      if (moreThanOne) {
        const minusQuantity = state.cartItems.find(
          (x) => x.product.slug.current === item.product.slug.current
        );
        minusQuantity!.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (x) => x.product.slug.current !== item.product.slug.current
        );
      }
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { addItemToCart, removeItemFromCart, resetState } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const calculateCartSubtotal = (state: RootState) =>
  state.cart.cartItems.reduce(
    (price, item) => item.product.price * item.quantity + price,
    0
  );
export const calculateTax = (state: RootState) => {
  let sub = calculateCartSubtotal(state);
  return (sub * 0.085).toFixed(2);
};

export default cartSlice.reducer;
