// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const TransactionModel = require("./transaction");

// mongoose.connect("mongodb://localhost:27017/your-database-name", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(express.json());

// app.post("/api/transaction", async (req, res) => {
//   console.log("Received transaction request:");
//   console.log(req.body);
//   try {
//     const transaction = new TransactionModel(req.body);
//     await transaction.save();
//     res.json({ message: "Transaction added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error adding transaction" });
//   }
// });

// app.listen(3001, () => {
//   console.log("Server listening on port 3001");
// });
