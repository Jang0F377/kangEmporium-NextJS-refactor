import { CartItem } from "../../typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { min } from "rxjs/operators";
import { RootState } from "../../store";

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
      const isInCart = state.cartItems.some((x) => x.product === item.product);
      if (isInCart) {
        const addToQty = state.cartItems.find(
          (x) => x.product.slug === item.product.slug
        );
        addToQty!.quantity = addToQty!.quantity + 1;
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItemFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const moreThanOne = item.quantity > 1;
      if (moreThanOne) {
        const minusQuantity = state.cartItems.find(
          (x) => x.product === item.product
        );
        minusQuantity!.quantity = minusQuantity!.quantity - 1;
      } else {
        state.cartItems.filter((x) => x.product !== item.product);
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
