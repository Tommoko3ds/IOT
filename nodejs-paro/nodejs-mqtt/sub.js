const mqtt = require('mqtt');
const mysql = require('mysql');

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sm52_arduino"
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Conexión al broker MQTT
const sub = mqtt.connect('mqtt://localhost:9000');

sub.on('connect', () => {
    sub.subscribe('topic test');
    console.log('Conexión exitosa al broker MQTT');
});

sub.on('message', (topic, message) => {
    message = message.toString();
    console.log('Mensaje recibido:', message);

    // Extrae el ID del sensor y el valor del mensaje recibido
    const sensor_id = parseInt(message.split(":")[0].split(" ")[1]);
    const sensor_value = parseInt(message.split(":")[1]);

    // Actualiza el valor del sensor en la base de datos
    const sql = "UPDATE infrarrojos SET estado_sensor = ? WHERE id_infrarrojo = ?";
    db.query(sql, [sensor_value, sensor_id], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en la base de datos:', err);
            return;
        }
        console.log('Datos actualizados en la base de datos');
    });
});

