const router = require('express').Router();
const fetchCtrl = require('../api/fetch.controller.js')

router.get('/biospace_industry', fetchCtrl.get_biospace_industry);
router.get('/biospace_earnings', fetchCtrl.get_biospace_earnings);
router.get('/fmp_news', fetchCtrl.get_stock_news);

module.exports = router;