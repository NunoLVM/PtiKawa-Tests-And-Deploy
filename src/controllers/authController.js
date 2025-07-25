const jwt = require('jsonwebtoken');
const { readData, writeData } = require('../utils/fileDB.js')


const SECRET_TOKEN = process.env.SECRET_TOKEN

async function register(req, res) {
  const { username, password } = req.body;
  const users = await readData('users.json');
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
    credit: 10
  };

  users.push(newUser);
  await writeData('users.json', users);

  res.status(201).json({ message: 'User registered' });
}

async function login(req, res) {
  const { username, password } = req.body;
  const users = await readData('users.json');
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });


  if (!SECRET_TOKEN) {
    throw new Error("Missing SECRET_TOKEN in environment");
  }
  const token = jwt.sign({ id: user.id }, SECRET_TOKEN, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = {
  register,
  login
};