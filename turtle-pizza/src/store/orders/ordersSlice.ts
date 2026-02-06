import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders, completeOrder } from './ordersThunks';

type Order = {
  id: string;
  items: Record<string, number>;
};

type OrdersState = {
  items: Order[];
  loading: boolean;
};

const initialState: OrdersState = {
  items: [],
  loading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(completeOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((o) => o.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;
