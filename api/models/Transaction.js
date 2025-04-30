
const { model, Schema } = require('mongoose');

const TransactionSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true, index: true },
});

const TransactionDocument = model('transaction', TransactionSchema);

module.exports = TransactionDocument;