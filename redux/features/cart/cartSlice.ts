import { RootState } from "@/redux/store";
import { IAppCoinBundle, IAppTicket } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todo } from "node:test";

export interface CartCoinItem {
  type: "coin";
  data: IAppCoinBundle;
  quantity: number;
}

export interface CartTicketItem {
  type: "ticket";
  data: IAppTicket;
  quantity: number;
}

export type CartListItem = CartCoinItem;

interface CartState {
  items: CartListItem[];
  currentSelectedTicket: CartTicketItem | null;
}

const initialState: CartState = {
  items: [],
  currentSelectedTicket: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartListItem>) => {
      const exists = state.items.some(
        (item) => item.data.id === action.payload.data.id,
      );

      // TODO: update exists case
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    addCurrentCheckoutTicket: (
      state,
      action: PayloadAction<CartTicketItem | null>,
    ) => {
      state.currentSelectedTicket = action.payload;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.data.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.currentSelectedTicket = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addCurrentCheckoutTicket,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCurrentSelectedTicket = (state: RootState) =>
  state.cart.currentSelectedTicket;
