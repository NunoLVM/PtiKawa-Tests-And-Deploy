const express = require('express');
const { createOrder, getOrders, rechargeCredit } = require('../controllers/coffeeController.js');
const auth = require('../middlewares/auth.js');

const router = express.Router();

router.use(auth);

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.post('/credit/recharge', rechargeCredit);

module.exports = router;
