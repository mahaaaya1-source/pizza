import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: Record<string, CartItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: string; title: string; price: number }>
    ) => {
      const { id, title, price } = action.payload;

      if (!state.items[id]) {
        state.items[id] = { id, title, price, quantity: 1 };
        return;
      }

      state.items[id].quantity += 1;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
