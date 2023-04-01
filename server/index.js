const app = require("./app.js");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

const stockCtrl = require("./api/stock.controller.js");
const fmpCtrl = require("./api/fmp.controller.js");
const userCtrl = require("./api/user.controller.js");



dotenv.config();

const port = process.env.PORT || 8099

MongoClient.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await stockCtrl.injectDB(client)
    await fmpCtrl.injectDB(client)
    await fmpCtrl.injectDBE(client)
    await fmpCtrl.injectDBF(client)
    await fmpCtrl.injectDBO(client)
    await fmpCtrl.injectUserFMP(client)
    await userCtrl.injectDB(client)

    app.listen(port , () => {
      console.log(`listening on port ${port}`)
    })
  })


