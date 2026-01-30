import { RootState } from "@/redux/store";
import { IAppCoinBundle, IAppTicket } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartCoinItem {
  type: "coin";
  data: IAppCoinBundle;
  quantity: number;
}

export type CartListItem = CartCoinItem;

interface CartState {
  items: CartListItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartListItem>) => {
      const exists = state.items.some(
        (item) => item.data.id === action.payload.data.id,
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.data.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
