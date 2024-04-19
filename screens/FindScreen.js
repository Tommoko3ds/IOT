import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Card } from 'react-native-elements';
import Navbar from './navbar'; 
import Footer from './Footer'; 
import { getAuth, signOut } from 'firebase/auth'; 

const FindScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar userName={userName} navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Buscar lugares cerca</Text>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ParkingDetail', { parkingType: 'Carro' })}>
            <Card
              containerStyle={styles.card}
              titleStyle={styles.cardTitle}
            >
              <Card.Title>Carro</Card.Title>
              <Card.Divider/>
              <Image
                source={require('../img/carrito.png')}
                style={styles.image}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ParkingDetail', { parkingType: 'Moto' })}>
            <Card
              containerStyle={styles.card}
              titleStyle={styles.cardTitle}
            >
              <Card.Title>Moto</Card.Title>
              <Card.Divider/>
              <Image
                source={require('../img/moto.png')}
                style={styles.image}
              />
            </Card>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../img/carro3.png')}
          style={styles.imageBigcar}
        />
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    color: '#EFBD28',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    width: (Dimensions.get('window').width - 60) / 2, // Modifica el ancho para que se ajuste a 2 cards
    borderRadius: 10,
    backgroundColor: '#f4cd28',
  },
  cardTitle: {
    color: '#000',
    fontSize: 14,
    marginBottom: 5,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  imageBigcar: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 60,
  },
});

export default FindScreen;
