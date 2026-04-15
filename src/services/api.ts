import type { OrderItem } from '../types';

const API_URL = '/api';

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Не удалось загрузить товары');
  const data = await res.json();
  return data.products;
}

export async function createOrder(items: OrderItem[]) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, createdAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error('Не удалось оформить заказ');
  return res.json();
}