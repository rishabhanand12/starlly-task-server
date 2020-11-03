let Stock = require("../models/stockSchema");

exports.getStocks = async (req, res, next) => {
  try {
    let stockData = await Stock.find();
    let projection = await Stock.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $project: { type: "$_id", count: 1, _id: 0 } },
    ]);
    let obj = calcProjection(projection);
    res.json({
      data: stockData,
      projection: obj,
    });
  } catch (err) {
    next(err);
  }
};

exports.addStock = async (req, res, next) => {
  try {
    Stock.create(req.body);
    res.json({
      message: "Stock Added",
    });
  } catch (err) {
    next(err);
  }
};

function calcProjection(projection) {
  var total = projection.reduce((a, e) => a + e.count,0);
  let obj = {};
  projection.forEach((elem) => {
    obj[elem.type] = elem.count / total;
  });
  return obj;
}
