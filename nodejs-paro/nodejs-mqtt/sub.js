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

let contador = 0;
let inserciones = 0;

sub.on('connect', () => {
    sub.subscribe('topic test');
    console.log('Conexión exitosa al broker MQTT');
});

sub.on('message', (topic, message) => {
    message = message.toString();
    console.log('Mensaje recibido:', message);

    // Extraer el valor del mensaje recibido
    const sensor_value = parseInt(message.split(":")[1]);

    // Actualizar el valor del sensor en la base de datos
    const sql = "UPDATE infrarrojos SET estado_sensor = ? WHERE id_infrarrojo = ?";
    db.query(sql, [sensor_value, inserciones + 1], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en la base de datos:', err);
            return;
        }
        console.log('Datos actualizados en la base de datos');

        // Contar los ceros
        if (sensor_value === 0) {
            contador++;
        }
        
        // Verificar si se han realizado 9 inserciones
        if ((inserciones + 1) % 9 === 0) {
            console.log('Número total de "0" recibidos en el conjunto:', contador);
            contador = 0; // Reiniciar el contador
            inserciones = 0; // Reiniciar las inserciones
        } else {
            inserciones++; // Incrementar el número de inserciones
        }
    });
});
