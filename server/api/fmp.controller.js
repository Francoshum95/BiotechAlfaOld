const axios = require('axios')
const jwt = require('jsonwebtoken');
const cache = require('../services/cache.js');

let Stocks
let Earnings 
let Financial
let Outlook 
let User
const defaultDuration = 60*15


class fmpCtrl{
  static async injectDB(conn){
    if (Stocks) {
      return
    }
    try {
      Stocks = await conn.db(process.env.DB_NAME).collection(process.env.COLLCTION_FMP)
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in Stocks: ${e}`,
      )
    }
  }

  

  static async injectDBE(conn){
    if (Earnings) {
      return
    }
    try {
      Earnings = await conn.db(process.env.DB_NAME).collection(process.env.COLLCTION_FMPE)
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in Stocks: ${e}`,
      )
    }
  }

  static async injectDBF(conn){
    if (Financial) {
      return
    }
    try {
      Financial = await conn.db(process.env.DB_NAME).collection(process.env.COLLCTION_FMPF)
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in Stocks: ${e}`,
      )
    }
  }

  static async injectDBO(conn){
    if (Outlook) {
      return
    }
    try {
      Outlook = await conn.db(process.env.DB_NAME).collection(process.env.COLLCTION_FMPO)
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in Stocks: ${e}`,
      )
    }
  }

  static async injectUserFMP(conn){
    if (User) {
      return
    }
    try {
      User = await conn.db(process.env.DB_NAME).collection(process.env.COLLCTION_USER)
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in Stocks: ${e}`,
      )
    }
  }

  static async getSummary(req, res){
    try{
      const {stock, token} = req.query
      
      if (stock){
        const cacheKey = `fmp_summary_${stock}`;
        const cachedData = await cache.get(cacheKey);

        if(cachedData){
          return res.json(cachedData)
        }

        const cursor = Stocks.find({id: stock});
        const response = await cursor.toArray();

        await cache.saveWithTtl(cacheKey, response)
        
        res.json(response);
      } else{
        return res.status(500).json({msg: error})
      }
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getStockData(req, res){
    try{
      const {stock, token} = req.query
      if (stock){
     
        
        const cacheKeystockInfo = `stockInfo_${stock}`
        var cacheDatastockInfo = await cache.get(cacheKeystockInfo);

        if(!cacheDatastockInfo){
          const cursorStockInfo = await Stocks.find({id: stock})
          cacheDatastockInfo = await cursorStockInfo.toArray()

          await cache.saveWithTtl(cacheKeystockInfo, cacheDatastockInfo)
        }

        const cacheKeyEarnings = `earnings_${stock}`
        var cacheDataEarnings = await cache.get(cacheKeyEarnings)

        if(!cacheDataEarnings){
          const cursorEarnings = await Earnings.find({id: stock})
          cacheDataEarnings = await cursorEarnings.toArray()

          await cache.saveWithTtl(cacheKeyEarnings, cacheDataEarnings)
        }

        const cacheKeyFinancial = `financial_${stock}`
        var cacheDataFinancial = await cache.get(cacheKeyFinancial)

        if(!cacheDataFinancial){
          const cursorFinancial = await Financial.find({id: stock})
          cacheDataFinancial = await cursorFinancial.toArray()

          await cache.saveWithTtl(cacheKeyFinancial, cacheDataFinancial)
        }

        const cacheKeyOutlook = `outlook_${stock}`
        var cacheDataOutlook = await cache.get(cacheKeyOutlook)

        if(!cacheDataOutlook){
          const cursorOutlook = await Outlook.find({id: stock})
          cacheDataOutlook = await cursorOutlook.toArray()

          await cache.saveWithTtl(cacheKeyOutlook, cacheDataOutlook)
        }


        if (token==="false"){
          return res.status(200).json({
            status: "Ok", 
            stockdata: cacheDatastockInfo[0], 
            earningsdata: {...cacheDataEarnings[0], earningsData:false},
            financialdata: cacheDataFinancial[0],
            outlookdata: {...cacheDataOutlook[0], ratio: false},
          })
        } 

        const tokenValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!tokenValid){
          return res.status(200).json({
            status: "Ok", 
            stockdata: cacheDatastockInfo[0], 
            earningsdata: {...cacheDataEarnings[0], earningsData: false},
            financialdata: cacheDataFinancial[0],
            outlookdata: {...cacheDataOutlook[0], ratio: false},
          })
        } 

        return res.status(200).json({
          status: "Ok", 
          stockdata: cacheDatastockInfo[0], 
          earningsdata: cacheDataEarnings[0],
          financialdata: cacheDataFinancial[0],
          outlookdata: cacheDataOutlook[0],
        })

      }
    }catch(err){
      console.log(err);
      return res.status(500).json({status: false ,message: err.message})
    }

  }

  static async getEarnings(req, res){
    try{
      const {stock} = req.query

      if (stock){
        const cacheKey = `earnings_${stock}`;
        const cachedData = await cache.get(cacheKey);

        if(cachedData){
          return res.json(cachedData)
        }

        const cursor = Earnings.find({id: stock});
        const response = await cursor.toArray();

        await cache.saveWithTtl(cacheKey, response)

        res.json(response);
      } else{
        return res.status(500).json({msg: error})
      }
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getFinancial(req, res){
    try{
      const {stock} = req.query

      if (stock){
        const cacheKey = `financial_${stock}`;
        const cachedData = await cache.get(cacheKey);

        if(cachedData){
          return res.json(cachedData)
        }

        const cursor = Financial.find({id: stock});
        const response = await cursor.toArray();

        await cache.saveWithTtl(cacheKey, response)
        
        res.json(response);
      } else{
        return res.status(500).json({msg: error})
      }
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getOutlook(req, res){
    try{
      const {stock} = req.query

      if (stock){
        const cacheKey = `outlook_${stock}`;
        const cachedData = await cache.get(cacheKey);

        if(cachedData){
          return res.json(cachedData)
        }

        const cursor = Outlook.find({id: stock});
        const response = await cursor.toArray();

        await cache.saveWithTtl(cacheKey, response)
        
        res.json(response);
      } else{
        return res.status(500).json({msg: error})
      }
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getSector(req, res){
    try{
      const {sector} = req.query

      if (sector){
        const cacheKey = `sector_${sector}`;
        const cachedData = await cache.get(cacheKey);

        if(cachedData){
          return res.json(cachedData)
        }
        const projection = {_id:1,
          id: 1, 
          ticker: 1, 
          equity_name:1,
          price_change: 1,
          stat20ema: 1,
          stat60ema: 1,
          statturnrange: 1,
          one_days_relative_performace: 1,
          one_week_relative_performance: 1,
          one_month_relative_performance: 1,
          three_month_relative_performance: 1,
          one_year_relative_performance: 1
        }; 

        const sorts = {one_days_relative_performace: -1};

        const cursor = Stocks.find({sector: sector}).project(projection).sort(sorts);
        const response = await cursor.toArray();

        await cache.saveWithTtl(cacheKey, response)
        
        res.json(response);
      } else{
        return res.status(406).json({msg: error})
      }
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getSummaryMany(req, res){
    try{
      const {stock, token} = req.query
      const liststock = stock.split(",")

      const tokenValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 

      if (!tokenValid){
        return res.status(402).json({status: false, message: "token invaild"})
      }
 
      if (stock){
        const projection = {_id:1,
          id: 1, 
          ticker: 1, 
          price: 1, 
          price_change: 1,
          volumn: 1,
          stat20ema: 1,
          stat60ema: 1,
          statturnrange: 1,
          one_days_relative_performace: 1,
          one_week_relative_performance: 1,
          one_month_relative_performance: 1,
          three_month_relative_performance: 1,
          one_year_relative_performance: 1
        }; 
        const sorts = {one_days_relative_performace: -1};

        const cursor = Stocks.find({id:{$in:liststock}}).project(projection).sort(sorts);
        const response = await cursor.toArray();
      
        res.json(response);
      } else{
        return res.status(500).json({msg: error})
      }
    }catch(err){

      return res.status(500).json({msg: err.message})
    }
  }

  static async getSummaryStock(req, res){
    try{
      const {stock} = req.query

      if (stock){
        const projection = {_id:1,
          id: 1, 
          ticker: 1, 
          price: 1, 
          price_change: 1,
          volumn: 1,
          stat20ema: 1,
          stat60ema: 1,
          statturnrange: 1,
          one_days_relative_performace: 1,
          one_week_relative_performance: 1,
          one_month_relative_performance: 1,
          three_month_relative_performance: 1,
          one_year_relative_performance: 1
        }; 

        const cursor = Stocks.find({id:stock}).project(projection);
        const response = await cursor.toArray();
      
        res.json(response);
      } else{
        return res.status(500).json({msg: error})
      }
    }catch(err){

      return res.status(500).json({msg: err.message})
    }
  }
}



module.exports = fmpCtrl