const express = require('express');
const app = express();
const PORT = 3002;

app.get('/', (req, res) => {
  res.send('Order Service is running');
});

app.get('/orders', (req, res) => {
  res.json([
    { orderId: '0101', item: 'Laptop', userId: 1 },
    { orderId: '0102', item: 'Monitor', userId: 2 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Order Service started on port ${PORT}`);
});
