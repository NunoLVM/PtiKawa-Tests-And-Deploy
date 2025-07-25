import { readData, writeData } from '../utils/fileDB.js';

const coffeeTypes = ['espresso', 'latte', 'cappuccino', 'ristretto'];
const maxOrdersPerHour = 3;

function validateOrder(order) {
  if (!coffeeTypes.includes(order.type)) return 'Invalid coffee type';
  if (order.type === 'ristretto' && order.sugar) return 'No sugar in ristretto';
  if (order.size && !['small', 'medium', 'large'].includes(order.size)) return 'Invalid size';
  return null;
}

export async function createOrder(userId, orderData) {
  const error = validateOrder(orderData);
  if (error) return { error };

  const orders = await readData('orders.json');
  const now = Date.now();
  const recentOrders = orders.filter(o => o.userId === userId && now - o.createdAt < 3600000);
  if (recentOrders.length >= maxOrdersPerHour) return { error: 'Order limit reached' };

  const newOrder = {
    id: orders.length + 1,
    userId,
    ...orderData,
    createdAt: now
  };

  orders.push(newOrder);
  await writeData('orders.json', orders);
  return newOrder;
}

export async function getOrders(userId) {
  const orders = await readData('orders.json');
  return orders.filter(o => o.userId === userId);
}
