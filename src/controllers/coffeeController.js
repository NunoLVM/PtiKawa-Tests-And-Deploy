const { recharge } = require( '../services/creditService.js')
const { createOrder: createCoffeeOrder, getOrders: getCoffeeOrders } = require("../services/coffeeService.js");


async function createOrder(req, res) {
  const user = req.user;
  const result = await createCoffeeOrder(user, req.body);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json(result);
}

async function getOrders(req, res) {
  const userId = req.user.id;
  const orders = await getCoffeeOrders(userId);
  res.json(orders);
}

async function rechargeCredit(req, res) {
  const userId = req.user.id;
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
  const newCredit = await recharge(userId, amount);
  res.json({ credit: newCredit });
}

module.exports = {
  createOrder,
  getOrders,
  rechargeCredit
};