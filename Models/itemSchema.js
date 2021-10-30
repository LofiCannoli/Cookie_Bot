const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemID: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
})

const model = mongoose.model('itemModels', itemSchema);
module.exports = model;
