const router = require('express').Router();
const stockCtrl = require("../api/stock.controller.js");

router.get('/weekly', stockCtrl.getWeekly);
router.get('/summary', stockCtrl.getSummary);
router.get('/stock', stockCtrl.getStock);
router.get('/ticker', stockCtrl.getTicker);
router.get('/stock_all', stockCtrl.getAllStock);


module.exports = router