const SocketServer = require('ws').Server;
const cache = require('../services/cache');



class webSocketYF{

  static async get_stream(ws, req){
    const wss = new WebSocket.Server({
      port: 8080,
    });
    const {ticker} = req.stock;

    wss.on('message', msg => {
      const priceData = cache.get(ticker)
      console.log(priceData);
      wss.send(priceData)
  })

  wss.on('close', () => {
      console.log('WebSocket was closed')
  })
     
  }
};

module.export = webSocketYF