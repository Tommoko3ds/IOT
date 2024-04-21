import serial
import mysql.connector
import websockets
# Configuración del puerto serie
arduino_port = 'COM4'  # Ajusta esto según tu sistema operativo
baud_rate = 9600
ser = serial.Serial(arduino_port, baud_rate)

# Configuración de la conexión a la base de datos
db_host = 'localhost'
db_user = 'root'
db_password = ''
db_name = 'sm52_arduino'

# Conectar a la base de datos
db_connection = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name
)
db_cursor = db_connection.cursor()

try:
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            data = line.split(",")  # Dividir la línea en partes separadas por comas
            id_infrarrojo = int(data[0])
            estado_sensor = int(data[1])
            print("Datos recibidos desde Arduino - id_infrarrojo:", id_infrarrojo, "estado_sensor:", estado_sensor)
            
            # Actualizar la base de datos
            query = "UPDATE infrarrojos SET estado_sensor = %s WHERE id_infrarrojo = %s"
            values = (estado_sensor, id_infrarrojo)
            db_cursor.execute(query, values)
            db_connection.commit()
            
except KeyboardInterrupt:
    ser.close()
    db_connection.close()
