import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';

const LoginAdminScreen = () => {
  // Datos de ejemplo para el gráfico
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color de la línea
        strokeWidth: 2, // Ancho de la línea
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Administrador</Text>
      <View style={styles.cardContainer}>
        <Card containerStyle={styles.card}>
          <Text style={styles.cardTitle}>Usuarios Activos</Text>
          <Text style={styles.cardValue}>245</Text>
        </Card>
        <Card containerStyle={styles.card}>
          <Text style={styles.cardTitle}>Ingresos Mensuales</Text>
          <Text style={styles.cardValue}>$5,230</Text>
        </Card>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Gráfico de Ventas Mensuales</Text>
        <LineChart
          data={data}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
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
    marginBottom: 20,
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
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LoginAdminScreen;
