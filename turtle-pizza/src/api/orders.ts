import axios from 'axios';

const BASE_URL = 'https://turtle-pizza-907e5-default-rtdb.firebaseio.com';

export const createOrderApi = async (order: Record<string, number>) => {
  const { data } = await axios.post(`${BASE_URL}/orders.json`, order);
  return data;
};

export const fetchOrdersApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/orders.json`);
  if (!data) return [];
  return Object.entries(data).map(([id, items]) => ({
    id,
    items: items as Record<string, number>,
  }));
};

export const deleteOrderApi = async (id: string) => {
  await axios.delete(`${BASE_URL}/orders/${id}.json`);
};
