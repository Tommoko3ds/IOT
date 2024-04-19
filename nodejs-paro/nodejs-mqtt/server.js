const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mqtt = require('mqtt');
const path = require('path');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const mqttClient = mqtt.connect('mqtt://localhost:9000');

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sm52_arduino"
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

// Manejar mensajes MQTT recibidos y emitirlos a los clientes a través de WebSocket
mqttClient.on('message', (topic, message) => {
  console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`); // Imprimir mensaje en consola
  
  // Insertar los datos en la base de datos MySQL
  const insertQuery = 'INSERT INTO nombre_de_la_tabla (columna_del_dato) VALUES (?)';
  db.query(insertQuery, [message.toString()], (err, result) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      return;
    }
    console.log('Datos insertados en la base de datos');
  });

  // Emitir los datos a los clientes a través de WebSocket
  io.emit('mqtt_message', { topic, message: message.toString() });

  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener datos desde la base de datos
app.get('/api/data', (req, res) => {
  const query = 'SELECT id_infrarrojo, estado_sensor FROM infrarrojos'; // Query para seleccionar todos los datos de la tabla 'arduino'

  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error al obtener datos de la base de datos:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }

    res.json(rows); // Enviar los datos como respuesta en formato JSON
  });
});

// Configuración del puerto del servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
