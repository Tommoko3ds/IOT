//bróker.js
const mosca = require('mosca');

const broker = new mosca.Server({ port: 9000 });

broker.on('ready', () => {
  console.log('Mosca broker está listo!');
});

broker.on('clientConnected', (client) => {
  console.log('Nuevo cliente conectado: ' + client.id);
});

/*
broker.on('published', (packet) => {
  console.log('Mensaje publicado:', packet.payload.toString());
});*/
