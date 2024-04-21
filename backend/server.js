const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importa el paquete CORS

const app = express();
const port = 3000;

// Middleware de CORS
app.use(cors());
app.use(express.json());
// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sm52_arduino'
});

// Conexión a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para obtener todos los datos de la tabla "infrarrojos"
app.get('/infrarrojos', (req, res) => {
  connection.query('SELECT * FROM infrarrojos', (err, results) => {
    if (err) {
      console.error('Error al consultar la tabla: ', err);
      res.status(500).send('Error al consultar la tabla');
      return;
    }
    res.json(results);
  });
});
app.put('/infrarrojos/update', (req, res) => {
  const { id_infrarrojo, estado_sensor} = req.body;

  console.log(`Updating infrarrojo with id: ${id_infrarrojo} to status: ${estado_sensor}`); // Agrega esta línea

  const updateQuery = 'UPDATE infrarrojos SET estado_sensor = 1 WHERE id_infrarrojo = ?';

  connection.query(updateQuery, [id_infrarrojo], (err, result) => {
    // Resto del código...
  });
});
app.put('/infrarrojos/updateone', (req, res) => {
  const { id_infrarrojo, estado_sensor} = req.body;

  console.log(`Updating infrarrojo with id: ${id_infrarrojo} to status: ${estado_sensor}`);

  const updateQuery = 'UPDATE infrarrojos SET estado_sensor = 0 WHERE id_infrarrojo = 11';

  connection.query(updateQuery, [estado_sensor, id_infrarrojo], (err, result) => {
    // Resto del código...
  });
});
app.post('/set-status', (req, res) => {
  const { id_infrarrojo, estado_sensor } = req.body;

  console.log(`Updating infrarrojo with id: ${id_infrarrojo} to status: ${estado_sensor}`); // Agrega esta línea

  const updateQuery = 'UPDATE infrarrojos SET estado_sensor = ? WHERE id_infrarrojo = ?';
  connection.query(updateQuery, [estado_sensor, id_infrarrojo], (err, result) => {
    // Resto del código...
  });
});
// Ruta para obtener el recuento de los valores 0 y 1 en la columna "estado_sensor"
app.get('/infrarrojos/count', (req, res) => {
  const countQuery = 'SELECT estado_sensor, COUNT(*) AS count FROM infrarrojos GROUP BY estado_sensor';
  
  connection.query(countQuery, (err, results) => {
    if (err) {
      console.error('Error al contar los valores en la tabla: ', err);
      res.status(500).send('Error al contar los valores en la tabla');
      return;
    }

    // Objeto para almacenar el recuento de los valores
    const count = {
      0: 0,
      1: 0
    };

    // Recorre los resultados y suma los valores
    results.forEach(row => {
      count[row.estado_sensor] = row.count;
    });

    res.json(count); // Envía el objeto con el recuento de los valores como respuesta en formato JSON
  });
});
// Ruta para actualizar el estado del sensor
app.post('/set-status', (req, res) => {
  const { id_infrarrojo, estado_sensor } = req.body;

  // Actualiza el estado del sensor en la base de datos
  const updateQuery = 'UPDATE infrarrojos SET estado_sensor = ? WHERE id_infrarrojo = ?';
  connection.query(updateQuery, [estado_sensor, id_infrarrojo], (err, result) => {
    if (err) {
      console.error('Error al actualizar el estado del sensor:', err);
      res.status(500).send('Error al actualizar el estado del sensor');
      return;
    }
    console.log('Estado del sensor actualizado correctamente');
    res.status(200).send('Estado del sensor actualizado correctamente');
  });
});
// Escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor API Node.js escuchando en http://localhost:${port}`);
});
