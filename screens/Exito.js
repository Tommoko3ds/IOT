import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Exito = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>¡Pago exitoso!</Text>
        <Text style={styles.subtext}>Gracias por tu compra.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  card: {
    alignItems: 'center', // Asegurar que el contenido esté centrado horizontalmente
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 18,
  },
});

export default Exito;
