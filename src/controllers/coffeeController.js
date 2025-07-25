import { createOrder as createCoffeeOrder, getOrders as getCoffeeOrders } from '../services/coffeeService.js';
import { recharge } from '../services/creditService.js';


export async function createOrder(req, res) {
  const userId = req.user.id;
  const result = await createCoffeeOrder(userId, req.body);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json(result);
}

export async function getOrders(req, res) {
  const userId = req.user.id;
  const orders = await getCoffeeOrders(userId);
  res.json(orders);
}

export async function rechargeCredit(req, res) {
  const userId = req.user.id;
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
  const newCredit = await recharge(userId, amount);
  res.json({ credit: newCredit });
}
