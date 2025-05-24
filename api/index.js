
// // const express = require('express');
// // const cors = require('cors');
// // require("dotenv").config();
// // const app = express();
// // const Transaction = require('./models/Transaction')
// // const mongoose = require('mongoose');

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URL)
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch((error) => {
// //     console.error('Error connecting to MongoDB:', error);
// //     process.exit(1);
// //   });

// // app.use(cors());
// // app.use(express.json())

// // app.get('/api/test', (req, res) => {
// //   res.send({ body: 'testing successful' })
// // })

// // app.post("/api/transaction", async (req, res) => {
// //   try {
// //     const { name, description, datetime, price } = req.body;

// //     // Validate fields
// //     if (!name || !description || !datetime || !price) {
// //       return res.status(400).send({ error: 'All fields are required' });
// //     }

// //     // Validate datetime format
// //     const date = new Date(datetime);
// //     if (isNaN(date.getTime())) {
// //       return res.status(400).send({ error: 'Invalid datetime format' });
// //     }

// //     // Validate price
// //     if (isNaN(price) || price <= 0) {
// //       return res.status(400).send({ error: 'Invalid price' });
// //     }

// //     const transaction = await Transaction.create({ name, description, datetime, price });
// //     res.json(transaction);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send({ error: 'Failed to create transaction' });
// //   }
// // });
// // // yaha se
// // app.get("/api/transaction",async(req,res)=>{
// //   await mongoose.connect(process.env.MONGO_URL);
// //   const transactions = await Transaction.find();
// //   res.json(transactions);
// // })
// // // yaha tak
// // app.listen(3001, () => {
// //   console.log("server is running on port 3001");
// // })
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Transaction = require('./models/Transaction');

// const app = express();

// // Connect to MongoDB once
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   });

// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/api/test', (req, res) => {
//   res.send({ body: 'testing successful' });
// });

// // POST create transaction
// app.post('/api/transaction', async (req, res) => {
//   try {
//     const { name, description, datetime, price } = req.body;

//     if (!name || !description || !datetime || !price) {
//       return res.status(400).send({ error: 'All fields are required' });
//     }

//     const date = new Date(datetime);
//     if (isNaN(date.getTime())) {
//       return res.status(400).send({ error: 'Invalid datetime format' });
//     }

//     if (isNaN(price) || price <= 0) {
//       return res.status(400).send({ error: 'Invalid price' });
//     }

//     const transaction = await Transaction.create({ name, description, datetime, price });
//     res.json(transaction);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Failed to create transaction' });
//   }
// });

// // GET all transactions (fix route name to plural to match frontend)
// app.get('/api/transactions', async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Failed to fetch transactions' });
//   }
// });

// // Use dynamic port for Render (fallback to 3001 locally)
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const app = express();

// Connect to MongoDB once at startup
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.send({ body: 'testing successful' });
});

// POST create transaction at /api/transactions
app.post('/api/transactions', async (req, res) => {
  try {
    const { name, description, datetime, price } = req.body;

    if (!name || !description || !datetime || !price) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const date = new Date(datetime);
    if (isNaN(date.getTime())) {
      return res.status(400).send({ error: 'Invalid datetime format' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).send({ error: 'Invalid price' });
    }

    const transaction = await Transaction.create({ name, description, datetime, price });
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create transaction' });
  }
});

// GET all transactions at /api/transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch transactions' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
