import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PARKPAL</Text>
      <Image
        source={require('../img/carro.png')}
        style={styles.image}
      />
      <Text style={styles.subTitle}>Dile adiós al estrés de buscar lugar en el estacionamiento.</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.buttonText, styles.loginButtonText]}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.buttonText, styles.signupButtonText]}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.termsText}>Al iniciar sesión, aceptas los términos y condiciones.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#EFBD28',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#F39913',
    textAlign: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 80,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '170%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10, 
    paddingHorizontal: 10
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#f4cd28',
  },
  signupButton: {
    backgroundColor: '#EAEAEA',
  },
  loginButtonText: {
    color: '#000000',
  },
  signupButtonText: {
    color: '#898989',
  },
  termsText: {
    fontSize: 12,
    color: '#898989',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
});

