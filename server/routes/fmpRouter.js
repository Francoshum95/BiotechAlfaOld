const router = require('express').Router();
const fmpCtrl = require("../api/fmp.controller.js");

router.get('/summary', fmpCtrl.getSummary);
router.get('/earnings', fmpCtrl.getEarnings);
router.get('/financial', fmpCtrl.getFinancial);
router.get('/outlook', fmpCtrl.getOutlook);
router.get('/sector', fmpCtrl.getSector);
router.get('/summarymany', fmpCtrl.getSummaryMany);
router.get('/summarystock', fmpCtrl.getSummaryStock);
router.get('/outlookpage', fmpCtrl.getStockData);

module.exports = router


