const cache = require('../services/cache.js');
const axios = require('axios')

const defaultDuration = 60*15

class fetchCtrl{
  static async get_biospace_industry(req, res){

    try{
      const cacheKey = 'biospace_industry';
      const cachedData = await cache.get(cacheKey);
  
      if(cachedData){
        return res.json(cachedData)
      }
  
      const mainnews = await axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://app.newsloth.com/biospace-com/VlRQVQ.rss")

      await cache.saveWithTtl(cacheKey, mainnews.data, defaultDuration)
  
      res.json(mainnews.data)
    } catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

  static async get_biospace_earnings(req, res){

    try{
      const cacheKey = 'biospace_earnings';
      const cachedData = await cache.get(cacheKey);
  
      if(cachedData){
        return res.json(cachedData)
      }
  
      const earningsnews = await axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://app.newsloth.com/biospace-com/VlRRUQ.rss")
      
      await cache.saveWithTtl(cacheKey, earningsnews.data, defaultDuration)
  
      res.json(earningsnews.data)
    } catch(err){
      return res.status(500).json({msg: err.message})
    }
  } 

  static async get_stock_news(req, res){
    try{
      const {stock} = req.query
      const cacheKey = 'fmp_stock_news';
      const cachedData = await cache.get(cacheKey);
      
      if(cachedData){
        return res.json(cachedData)
      }

      const stocknews = await axios.get(`${process.env.FMP_BASE_URL_v3}/stock_news?tickers=${stock}&limit=5&apikey=${process.env.FMP_APIKEY}`)
      const stockpress = await axios.get(`${process.env.FMP_BASE_URL_v3}/press-releases/${stock}?limit=5&apikey=${process.env.FMP_APIKEY}`)

      const response ={
        id: stock,
        news:stocknews.data,
        press:stockpress.data
      }

      res.json(response)

    } catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

}

module.exports = fetchCtrl