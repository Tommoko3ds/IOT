import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import GetAddress from './components/getAdress';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';

import ChartComponent from './components/graphicBar';
const MainScreen = () => {
  const ipAddress = GetAddress();
  const [data, setData] = useState(null);
  const [count, setCount] = useState({ '0': 0, '1': 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtiene los datos de los infrarrojos
        const response = await axios.get(`http://192.168.0.182:3000/infrarrojos`);
        setData(response.data);
        
        // Obtiene el total de ceros
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

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      <Text style={{ flex: 1 }}>{item.id_infrarrojo}</Text>
      <Text style={{ flex: 1 }}>{item.estado_sensor}</Text>
      <Button
        title="Guardar"
        onPress={() => handleSave(item.id_infrarrojo)}
      />
    </View>
  );

  const handleSave = async (id) => {
    try {
      // Envía el estado 0 al servidor para el sensor con el ID especificado
    await axios.put(`http://192.168.0.182:3000/infrarrojos/updateone`, {
  id_infrarrojo: 11,
  estado_sensor: 0, // Asegúrate de que este es el valor correcto
});
      // Actualiza los datos después de guardar
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
const handleSendOne = async (id_infrarrojo) => {
  try {
    await axios.put(`http://192.168.0.182:3000/infrarrojos/updateone`, {
      id_infrarrojo,
      estado_sensor: 0
    });
    fetchData();
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
  return (
    <View>
      <Text>Ocupados: {count['0']}</Text>
      <Text>Espacios Disponibles: {count['1']}</Text>
   <Button
  title="Guardar"
  onPress={() => handleSendOne(item.id_infrarrojo)}
/>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id_infrarrojo.toString()}
      />


{count && <ChartComponent data={count} />}
    </View>
  );
};

export default MainScreen;
