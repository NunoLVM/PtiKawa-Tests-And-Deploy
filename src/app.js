const express = require('express');
require('dotenv/config');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const coffeeRoutes = require('./routes/coffeeRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./swagger.yaml')));

app.get('/', (req, res) => {
  res.send('Welcome to the Coffee API!');
});


app.use('/auth', authRoutes);
app.use(coffeeRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});