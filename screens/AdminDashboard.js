import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';
import Navbar from './navbar'; // Importa el componente Navbar

const LoginAdminScreen = () => {
  // Estado para almacenar los datos de las gráficas
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  // Función para simular datos de gráficas en tiempo real
  const generateRandomData = () => {
    const newData1 = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    const newData2 = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setData1(newData1);
    setData2(newData2);
  };

  // Genera datos de gráficas aleatorios cuando se monta el componente
  useEffect(() => {
    generateRandomData();
  }, []);

  // Lógica para actualizar los datos de las gráficas periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      generateRandomData();
    }, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Navbar /> {/* Agrega el componente Navbar aquí */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dashboard Administrador</Text>
        {/* Espacio para las nuevas cartas */}
        <View style={styles.cardContainer}>
          <Card containerStyle={styles.card}>
            <Text style={[styles.cardTitle, styles.boldText]}>Gráfico de Ventas</Text>
            <LineChart
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                datasets: [{ data: data1 }],
              }}
              width={250}
              height={200}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </Card>
          <Card containerStyle={styles.card}>
            <Text style={[styles.cardTitle, styles.boldText]}>Gráfico de ocupación en estacionamiento</Text>
            <LineChart
              data={{
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                datasets: [{ data: data2 }],
              }}
              width={250}
              height={200}
              yAxisLabel="%"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  card: {
    width: '45%',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default LoginAdminScreen;
