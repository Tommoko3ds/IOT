const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sm52_arduino'
});

// Conéctate a la base de datos MySQL
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

// Middleware para analizar el cuerpo de las solicitudes entrantes
app.use(bodyParser.json());

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Permite los métodos HTTP especificados
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permite los encabezados especificados
  next();
});

// Define el endpoint para obtener los datos de los sensores
app.get('/api/datosensores', (req, res) => {
  // Realiza una consulta a la base de datos para obtener los datos de los sensores
  connection.query('SELECT id_infrarrojo, estado_sensor FROM infrarrojos', (err, results) => {
    if (err) {
      console.error('Error al obtener datos de los sensores:', err);
      res.status(500).json({ error: 'Error al obtener datos de los sensores' });
      return;
    }
    // Devuelve los resultados como JSON
    res.json(results);
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
