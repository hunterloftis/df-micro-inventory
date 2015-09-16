var jackrabbit = require('jackrabbit');
var db = require('./db');

var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
var exchange = rabbit.default();

exchange
  .queue({ name: 'inventory.get' })
  .consume(onInventoryGet);

function onInventoryGet(data, reply) {
  console.log('got request for inventory:', data.id);
  reply( { inventory: db[data.id] } );
}
