const { readData, writeData } =require('../utils/fileDB.js')
const { calculateOrderPrice, canAffordOrder, applyDiscount } = require('./orderService.js')

const coffeeMenu = {
  espresso: 2,
  latte: 3.5,
  cappuccino: 4,
  ristretto: 1.8
};
const maxOrdersPerHour = 3;

function validateOrder(orderData) {
  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    return 'Order must contain at least one item';
  }
  for (const item of orderData.items) {
    if (!coffeeMenu.hasOwnProperty(item.name.toLowerCase())) {
      return `Invalid coffee type: ${item.name}`;
    }
    if (item.name.toLowerCase() === 'ristretto' && item.sugar) {
      return 'No sugar allowed in ristretto';
    }
    if (item.price !== coffeeMenu[item.name.toLowerCase()]) {
      return `Price mismatch for ${item.name}`;
    }
  }
  return null;
}

async function createOrder(user, orderData) {
  const error = validateOrder(orderData);
  if (error) return { error };

  // Calcul du total et application remise
  const rawTotal = calculateOrderPrice(orderData.items);
  const total = applyDiscount(rawTotal);
  
  if (!canAffordOrder(user, total)) {
    return { error: 'Insufficient credit' };
  }

  const orders = await readData('orders.json');
  const now = new Date().toISOString();

  const oneHourAgo = Date.now() - 3600000;
  const recentOrders = orders.filter(o => o.userId === user.id && new Date(o.createdAt).getTime() > oneHourAgo);
  if (recentOrders.length >= maxOrdersPerHour) return { error: 'Order limit reached' };

  const newOrder = {
    id: orders.length + 1,
    userId: user.id,
    items: orderData.items,
    total,
    createdAt: now
  };

  orders.push(newOrder);
  await writeData('orders.json', orders);

  const users = await readData('users.json');
  const userIndex = users.findIndex(u => u.id === user.id);
  users[userIndex].credit -= total;
  await writeData('users.json', users);

  return newOrder;
}

async function getOrders(userId) {
  const orders = await readData('orders.json');
  return orders.filter(o => o.userId === userId);
}

module.exports = {
  createOrder,
  getOrders
};