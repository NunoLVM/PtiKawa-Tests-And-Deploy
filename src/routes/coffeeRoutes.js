import express from 'express';
import { createOrder, getOrders, rechargeCredit } from '../controllers/coffeeController.js';
import { login, register } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.use(auth);

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.post('/credit/recharge', rechargeCredit);

export default router;
