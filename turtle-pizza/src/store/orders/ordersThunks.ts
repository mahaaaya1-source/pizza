import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderApi, fetchOrdersApi, deleteOrderApi } from '@/api/orders';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (order: Record<string, number>) => {
    await createOrderApi(order);
  }
);

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  return await fetchOrdersApi();
});

export const completeOrder = createAsyncThunk('orders/complete', async (id: string) => {
  await deleteOrderApi(id);
  return id;
});
