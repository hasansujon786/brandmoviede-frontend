import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import cartReducer from "./features/cart/cartSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
};

export const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer,
);
