import { RootState } from "@/redux/store";
import { IAppCoinBundle, IAppTicket } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  currentCustomBundleCoin: IAppCoinBundle | null;
}

const initialState: CartState = {
  items: [],
  currentSelectedTicket: null,
  currentCustomBundleCoin: null,
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
    addCurrentCustomCoinBundle: (
      state,
      action: PayloadAction<IAppCoinBundle | null>,
    ) => {
      state.currentCustomBundleCoin = action.payload;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.data.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.currentSelectedTicket = null;
      state.currentCustomBundleCoin = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addCurrentCheckoutTicket,
  addCurrentCustomCoinBundle,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCurrentCustomBundleCoin = (state: RootState) => state.cart.currentCustomBundleCoin;
export const selectCurrentSelectedTicket = (state: RootState) =>
  state.cart.currentSelectedTicket;
