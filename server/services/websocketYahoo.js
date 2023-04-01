const WebSocket = require('isomorphic-ws')
const protobuf = require("protobufjs");
const { MongoClient } = require("mongodb");
const cache = require('../services/cache.js');
const defaultDuration = 60*60*120

const db_url = process.env.MONGO_URL
const db_name = process.env.DB_NAME
const db_collection = process.env.COLLCTION_FMP

const mongoClient = new MongoClient(db_url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})

async function connect (){
  try{
    await mongoClient.connect();
    const db = mongoClient.db(db_name).collection(db_collection)

    const projection = {id:1}

    const cacheKey = 'ticker_all';
    const cacheData = await cache.get(cacheKey);

    if (cacheData){
      return cacheData
    }

    const cursor = db.find().project(projection)
    const db_response = await cursor.toArray()
    await cache.saveWithTtl(cacheKey, db_response)

    return db_response

  } catch(err){
    console.log(err);
  }
}

let getticker = connect();

const root = protobuf.loadSync('./protobuf/YPricingData.proto');

const Yaticker = root.lookupType("yaticker");
const ws = new WebSocket('wss://streamer.finance.yahoo.com');



ws.onopen = function open() {
  getticker.then(function(result){
    let tickerlist = []

    result.forEach(item => {
      tickerlist.push(item.id)
    })
    
    ws.send(JSON.stringify({
      subscribe: tickerlist
    }));
  })

};
ws.onclose = function close() {
  console.log('disconnected');
};

ws.onmessage = async function incoming(data) {
  const incomeData = Yaticker.decode(Buffer.from(data.data, 'base64'))
  console.log(incomeData);
  await cache.saveWithTtl(`stream${incomeData.id}`, incomeData, defaultDuration)
};












