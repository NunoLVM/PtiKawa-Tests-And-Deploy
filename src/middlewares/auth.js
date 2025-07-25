const jwt = require('jsonwebtoken')
const { readData } =require('../utils/fileDB.js')

const SECRET = process.env.SECRET_TOKEN;

module.exports = async function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = jwt.verify(token, SECRET);
    const users = await readData('users.json');
    const user = users.find(u => u.id === payload.id);
    if (!user) return res.status(401).json({ error: 'Invalid user' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
