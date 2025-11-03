const express = require('express');
const app = express();

const orders = [
  { id: 1, item: 'Laptop', quantity: 1 },
  { id: 2, item: 'Phone', quantity: 2 }
];

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.listen(3002, () => {
  console.log('Order Service running on port 3002');
});
