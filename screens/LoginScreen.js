import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInicioSesion = async () => {
    if (!email || !contraseña) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Verificar si el correo electrónico es 'admin@gmail.com'
    if (email === 'admin@gmail.com') {
      setError('No se puede iniciar sesión con esta cuenta.');
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, contraseña);
      setError('');
      
      // Redireccionar a la pantalla 'Main' después del inicio de sesión exitoso
      navigation.navigate('Main');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No se encontró ningún usuario con este correo electrónico. Por favor, regístrate.');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="gray"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Contraseña"
            placeholderTextColor="gray"
            onChangeText={text => setContraseña(text)}
            value={contraseña}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleInicioSesion}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#F39913',
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  iconButton: {
    position: 'absolute',
    right: 10,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#EFBD28',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
