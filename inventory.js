var jackrabbit = require('jackrabbit');
var db = {
  1: 32,
  2: 4
};

var rabbit = jackrabbit(process.env.CLOUDAMQP_URL);
var topicExchange = rabbit.topic();

topicExchange
  .queue({ exclusive: true, key: 'inventory.get' })
  .consume(onInventoryGet);

function onInventoryGet(data, reply) {
  console.log('got request for inventory:', data.id);
  reply( { inventory: db[data.id] } );
}
