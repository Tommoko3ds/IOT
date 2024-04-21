import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {AppRegistry} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import CircularProgress from 'react-native-circular-progress-indicator';
const carImages = [
  require('../assets/car2.png'),

  // Agrega más imágenes según sea necesario
];
const ParkingDetailScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Obtener el nombre de usuario al cargar la pantalla
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
  const [data, setData] = useState(null);
  const [count, setCount] = useState({ '0': 0, '1': 0 });
 const selectSpotAndNavigate = () => {
  const selectedParkingSpot = `A011`; // Cambia esto para seleccionar el id_infrarrojo 11
  navigation.navigate('Resumen', { selectedParkingSpot }); // Navega a la pantalla de resumen con el lugar seleccionado
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.182:3000/infrarrojos`);
        console.log('Datos de infrarrojos:', response.data); // Verifica los datos recibidos
        setData(response.data);
        
        const zeroCountResponse = await axios.get(`http://192.168.0.182:3000/infrarrojos/count`);
        setCount(zeroCountResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSave = async (id) => {
    try {
      // Envía el estado 0 al servidor para el sensor con el ID especificado
      await axios.put(`http://192.168.0.182:3000/infrarrojos/updateone`, {
        id_infrarrojo: id,
        estado_sensor: 0,
      });
      // Actualiza los datos después de guardar
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  const renderItem = ({ item }) => {
    const estado_sensor = Number(item.estado_sensor);
    const buttonText = estado_sensor === 1 ? `A0${item.id_infrarrojo} Libre` : null;
  
    return (
      <View style={{ flex: 1, flexDirection: 'column', margin: 1, padding: 10 }}>
        <TouchableOpacity
          style={[styles.button, estado_sensor === 1 ? styles.greenButton : styles.redButton]}
          onPress={() => handleSave(item.id_infrarrojo)}
        >
          {estado_sensor === 1 ? (
            <Text style={styles.buttonText}>{buttonText}</Text>
          ) : (
            <Image
              source={require('../assets/car2.png')} // Reemplaza esto con la ruta a tu imagen
              style={{ width: 100, height: 50 }} // Ajusta esto según el tamaño que desees para tu imagen
            />
          )}
        </TouchableOpacity>
        {console.log('Estado del sensor:', estado_sensor)}
      </View>
    );
  };
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
  <Text style={styles.leftTitle}>Capacidad del estacionamiento</Text>
  <Text style={styles.rightTitle}>{count['1']} lugares libres</Text>
</View>

       
        <View style={styles.contentContainer}>
          <CircularProgress
            value={count['0']}
            radius={120}
            inActiveStrokeOpacity={0.5}
            activeStrokeWidth={15}
            inActiveStrokeWidth={20}
            progressValueStyle={{ fontWeight: '100', color: 'black' }}
            activeStrokeSecondaryColor="yellow"
            inActiveStrokeColor="black"
            duration={3000}
            dashedStrokeConfig={{ count: 100, width: 4 }}
          />
          <View style={styles.buttonsContainer}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id_infrarrojo.toString()}
              numColumns={2}
            />
             <TouchableOpacity style={styles.button} onPress={selectSpotAndNavigate}>
        <Text style={styles.buttonTexto}>Seleccionar</Text>
      </TouchableOpacity>
          </View>
        </View>
       
      </View>
    );
};

const styles = StyleSheet.create({
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    padding: 35,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTexto: {
    color: 'black',
    fontWeight: 'bold',
  },
  greenButton: {
    backgroundColor: 'green',
  },
  redButton: {
    backgroundColor: '#f4cd28',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  parkingMap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    marginLeft: 240, // Ajusta este valor según la distancia que desees
  },
  
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 10, 
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 300,
    marginLeft: 210, 
  },
  Image: {
    width: '10%',
    height: '10%',
    resizeMode: 'contain',
  },
  
});

export default ParkingDetailScreen;
