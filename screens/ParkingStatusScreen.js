import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import Navbar from './navbar';
import Footer from './Footer';

const ParkingStatusScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  // Función para obtener el nombre de usuario al cargar la pantalla
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  // Función para calcular la tarifa correspondiente según el tiempo transcurrido
  const calculateTariff = (elapsedTime) => {
    const ratePerMinute = 0.5; // Tarifa por minuto
    const tariff = elapsedTime * ratePerMinute; // Tarifa total
    return tariff.toFixed(2); // Redondear a 2 decimales
  };

  // Función para iniciar el temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      // Incrementar el tiempo transcurrido cada segundo
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Navbar userName={userName} navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Plaza Las Américas</Text>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="car-outline" size={64} color="#F39913" />
          <Text style={styles.placeName}>B-04</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Tiempo transcurrido:</Text>
          <Text style={styles.timeText}>{elapsedTime} segundos</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Tarifa correspondiente:</Text>
          <Text style={styles.priceText}>${calculateTariff(elapsedTime)}</Text>
        </View>
        <Text style={styles.warningText}>Tu tiempo de apartado está corriendo</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Terminar apartado</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50, // Para dar espacio al Footer
    justifyContent: 'space-between', // Distribuir los elementos verticalmente
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F39913',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeName: {
    fontSize: 24,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 18,
    marginRight: 10,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39913',
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F39913',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ParkingStatusScreen;
