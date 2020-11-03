let mongoose = require("mongoose");
let stockSchema = new mongoose.Schema(
  {
    scrip: {
      type: String,
    },
    type: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    marketVal: {
      type: Number,
    },
    price: {
      type: Number,
    },
    avgCost: {
      type: Number,
    },
    investedAmt: {
      type: Number,
    },
    percentageInvested: {
      type: Number,
    },
    unrealisedProfitLoss: {
      type: Number,
    },
    returns: {
      type: Number,
    },
  },
  { timestamps: true }
);

let Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
