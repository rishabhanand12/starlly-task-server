let express = require("express");
let controller = require("../controllers/stockController");
let router = express.Router();

router.post("/", controller.addStock);

router.get("/", controller.getStocks);

module.exports = router;
