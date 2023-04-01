const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL)

const { promisify } = require('util');
const setAsyncEx = promisify(client.setex).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);

client.on('error', err => {
  console.log('Error:' + err);
});

const defaultDuration = parseInt((new Date().setHours(23, 59, 59, 999) - new Date())/1000)

async function saveWithTtl(key, value, ttlSeconds = defaultDuration) {
  return await setAsyncEx(key, ttlSeconds, JSON.stringify(value)); 
}

async function get(key) {
  const jsonString = await getAsync(key);

  if (jsonString) {
    return JSON.parse(jsonString);
  }
}

async function del(key) {
  const jsonString = await delAsync(key);

  if (jsonString) {
    return JSON.parse(jsonString);
  }
}

module.exports = {
  saveWithTtl,
  get,
  del
}