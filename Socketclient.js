import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function SocketClient() {
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.182:3000/api/data');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const jsonData = await response.json();
        // Obtener el último dato del arreglo
        const lastData = jsonData.slice(-1)[0];
        setLatestData(lastData);
      } catch (error) {
        console.error('Error al obtener datos:', error.message);
      }
    };

    // Llamar a fetchData al montar el componente y cada vez que se actualice
    const interval = setInterval(fetchData, 100); // Actualizar cada 5 segundos (5000 milisegundos)
    fetchData(); // Llamar a fetchData inmediatamente al montar el componente

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dato del Arduino:</Text>
      <Text style={styles.dataText}>
        {latestData ? `Dato: ${latestData.data}` : 'Cargando último dato...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 16,
  },
});
