import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const products = await db.collection('products').find().limit(20).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const order = {
      ...req.body,
      userId: new mongoose.Types.ObjectId(req.body.userId),
      orderDate: new Date(req.body.orderDate),
      items: req.body.items.map(item => ({
        ...item,
        productId: new mongoose.Types.ObjectId(item.productId)
      }))
    };
    const result = await db.collection('orders').insertOne(order);
    res.json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id/reviews', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const reviews = await db.collection('reviews')
      .find({ productId: new mongoose.Types.ObjectId(req.params.id) })
      .toArray();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/reviews/:id', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const result = await db.collection('reviews').updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { $set: { rating: req.body.rating, comment: req.body.comment } }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));