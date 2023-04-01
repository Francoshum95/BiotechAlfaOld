const cache = require('../services/cache.js');

let Stocks 

class stockCtrl{
  static async injectDB(conn) { 
    if (Stocks) {
      return
    }
    try {
      Stocks = await conn.db(process.env.DB_NAME).collection(process.env.COLLCTION_STOCK)
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in Stocks: ${e}`,
      )
    }
  }

  static async getAllTicker(res, req){
    try{
      const projection = {id:1}

      const cacheKey = `ticker_alll`;
      const cachedData = await cache.get(cacheKey);

      if(cachedData){
        return res.json(cachedData)
      }

      const cursor = Stocks.find().project(projection)
      const response = await cursor.toArray()
      await cache.saveWithTtl(cacheKey, response)
      
      return json(response)
    }catch(err){
      return err.message
    }
  }

  static async getTicker(req, res){
    try{
      const {stock} = req.query
      const projection = {
                          id:1, 
                          equity_name:1,
                        };

      const cacheKey = `ticker_${stock}`;
      const cachedData = await cache.get(cacheKey);

      if(cachedData){
        return res.json(cachedData)
      }

      const cursor = Stocks.find({"id": {$eq: stock}}).project(projection)
      const response = await cursor.toArray()
      await cache.saveWithTtl(cacheKey, response)
      
      res.json(response)
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getWeekly(req, res){
    try{
      const {direction} = req.query
      const projection = {
                          id:1, 
                          one_week_relative_performance: 1
                        };
      const sorts = {one_week_relative_performance: direction};
      const limit = 21;
      
      const cacheKey = `quotes_weekly_${direction}`;
      const cachedData = await cache.get(cacheKey);

      if(cachedData){
        return res.json(cachedData)
      }

      const cursor = Stocks.find({}).project(projection).limit(limit).sort(sorts);
      const response = await cursor.toArray()
      await cache.saveWithTtl(cacheKey, response)
      
      res.json(response)
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getSummary(req, res){
    try{
      const projection = {_id:1,
                          id: 1, 
                          ticker: 1, 
                          equity_name:1,
                          price:1,
                          one_days_relative_performace: 1,
                          time: 1
                        }; 
      
      const sorts = {one_days_relative_performace: -1};
      const limit = 6;

      const cacheKey = 'stock_summary';
      const cachedData = await cache.get(cacheKey);

      if(cachedData){
        return res.json(cachedData)
      }

      const biocursor = Stocks.find({sector: "Biotechnology"}).project(projection).limit(limit).sort(sorts);
      const biotech = await biocursor.toArray()

      const eqcursor = Stocks.find({sector: "Health-Care-Equipment"}).project(projection).limit(limit).sort(sorts);
      const eq = await eqcursor.toArray()

      const phacursor = Stocks.find({sector: "Pharmaceuticals"}).project(projection).limit(limit).sort(sorts);
      const pha = await phacursor.toArray()

      const carecursor = Stocks.find({sector: "Health-Care-Services"}).project(projection).limit(limit).sort(sorts);
      const care = await carecursor.toArray()

      const discursor = Stocks.find({sector: "Health-Care-Distributors"}).project(projection).limit(limit).sort(sorts);
      const dis = await discursor.toArray()    
      
      const supcursor = Stocks.find({sector: "Health-Care-Supplies"}).project(projection).limit(limit).sort(sorts);
      const sup = await supcursor.toArray()   

      const lifcursor = Stocks.find({sector: "Life-Sciences-Tools-Services"}).project(projection).limit(limit).sort(sorts);
      const lif = await lifcursor.toArray()  
      
      const faccursor = Stocks.find({sector: "Health-Care-Facilities"}).project(projection).limit(limit).sort(sorts);
      const fac = await faccursor.toArray() 
      
      const techcursor = Stocks.find({sector: "Health-Care-Technology"}).project(projection).limit(limit).sort(sorts);
      const tech = await techcursor.toArray() 

      const response = {
        Biotechnology: {
          equity: biotech,
          type: "Biotechnology",
          id: "Biotechnology"
        }, 
        Health_Care_Equipment:{
          equity: eq,
          type: "Health Care Equipment",
          id: "Health-Care-Equipment"  
        },
        Pharmaceuticals:{
          equity: pha,
          type: "Pharmaceuticals",
          id: "Pharmaceuticals"  
        },
        Health_Care_Services:{
          equity: care,
          type: "Health Care Services",
          id: "Health-Care-Services"  
        },
        Health_Care_Distributors:{
          equity: dis,
          type: "Health Care Distributors",
          id: "Health-Care-Distributors" 
        },
        Health_Care_Supplies:{
          equity: sup,
          type: "Health Care Supplies",
          id: "Health-Care-Supplies" 
        },
        Life_Sciences_Tools_Services:{
          equity: lif,
          type: "Life Sciences Tools & Services",
          id: "Life-Sciences-Tools-Services" 
        },
        Health_Care_Facilities: {
          equity: fac,
          type: "Health Care Facilities",
          id: "Health-Care-Facilities" 
        },
        Health_Care_Technology: {
          equity: tech,
          type: "Health Care Technology",
          id: "Health-Care-Technology" 
        },
      }

      await cache.saveWithTtl(cacheKey, response)
      res.json(response)
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getStock(req, res){
    try{
      const {stock, token} = req.query
  
      if(stock){
        const cacheKey = `stock_${stock}`;
        const cachedData = await cache.get(cacheKey);

        if(cachedData){
          return res.json(cachedData)
        }

        const cursor = Stocks.find({id: stock})
        const response = await cursor.toArray()

        await cache.saveWithTtl(cacheKey, response)

        res.json(response)
      }

      return res.json({status: false})

    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getAllStock(req, res){
    try{
      const cacheKey = `stock_all`;
      const cachedData = await cache.get(cacheKey);

      if(cachedData){
        return res.json(cachedData)
      }

      const cursor = Stocks.find({})
      const response = await cursor.toArray()

      await cache.saveWithTtl(cacheKey, response)

      res.json(response)
    
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async getStreamStockPrice(req, res){
    try{
      const {ticker} = req.query;

      const cacheKey = 'stream';
      const cacheData = await cache.get(`${cacheKey}ticker`)

      return res.json(cacheData);       
    } catch(err){
      return res.status(400).json({meg: err.message})
    }
  }


};
module.exports = stockCtrl
