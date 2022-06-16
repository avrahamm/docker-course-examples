const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { MongoClient } = require("mongodb");
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, REDIS_HOST } = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/`;

const waitOn = require('wait-on');

const client = new MongoClient(uri);

const opts = {
  resources: [
    `tcp:${REDIS_HOST}:6379`,
    `tcp:${MONGO_HOST}:27017`,
  ],
};

(async () => {
  try {
    await waitOn(opts);
    // once here, all resources are available

    await client.connect();
    console.log(`connected`);

    app.get('/', async (req, res) => {
      res.send("Connected To Mongo");
    })

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

})().catch(console.dir);


