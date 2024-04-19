import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainScreen from './screens/MainScreen';
import FindScreen from './screens/FindScreen';
import ParkingStatusScreen from './screens/ParkingStatusScreen';
import AccountScreen from './screens/AccountScreen';
import ParkingDetailScreen from './screens/ParkingDetailScreen';
import Resumen from './screens/Resumen';
import PaymentGatewayScreen from './screens/PaymentGatewayScreen';
import Exito from './screens/Exito'; // Importar el componente Exito

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Estado para controlar si el pago fue exitoso

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} options={{title: 'Bienvenido'}} />
            <Stack.Screen name="Find" component={FindScreen} options={{title: 'Encuentra un estacionamiento'}} />
            <Stack.Screen name="ParkingStatus" component={ParkingStatusScreen} options={{ title: 'Estado del Parking' }} /> 
            <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'Cuenta de usuario' }} /> 
            <Stack.Screen name="ParkingDetail" component={ParkingDetailScreen} options={{ title: 'Detalles del estacionamiento' }} />
            <Stack.Screen name="PaymentGateway" component={PaymentGatewayScreen} options={{ title: 'Método de pago' }} />
            <Stack.Screen name="Resumen" component={Resumen} options={{ title: 'Resumen de Reservación' }} />
            <Stack.Screen name="Exito" component={Exito} options={{ title: 'exito' }} />

          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} /> 
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Crear Cuenta' }} /> 
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;