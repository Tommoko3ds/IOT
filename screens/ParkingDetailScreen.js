import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Animated } from 'react-native';

// Importa las imágenes de los coches
const carImages = [
  require('../assets/car.png'),
  require('../assets/car2.png'),
  require('../assets/car.png'),
  require('../assets/car4.png'),
  // Agrega más imágenes según sea necesario
];

// Espacios ocupados constantes
const occupiedSpots = [
  { id: 1, carIndex: 0 },
  { id: 3, carIndex: 1 },
  { id: 7, carIndex: 2 },
  { id: 11, carIndex: 3 },
];

const ParkingDetailScreen = ({ navigation }) => {
  const [selectedSpot, setSelectedSpot] = useState(null); // Estado para almacenar el cajón seleccionado
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [fadeAnim] = useState(new Animated.Value(0)); // Estado para controlar la animación de desvanecimiento
  const availableSpots = 12 - occupiedSpots.length - (selectedSpot !== null ? 1 : 0); // Calcula los lugares libres

  // Función para manejar el clic en un espacio de estacionamiento
  const handleParkingSpotPress = (spotId) => {
    setSelectedSpot(spotId);
  };

  // Función para abrir el modal
  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Función para cerrar el modal
  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  // Función para seleccionar un lugar y navegar a la pantalla de resumen
  const selectSpotAndNavigate = () => {
    if (selectedSpot === null) {
      openModal();
      return;
    }
    console.log(`Cajón ${selectedSpot + 1} seleccionado`);
    // Aquí puedes agregar la lógica para guardar el cajón seleccionado
    const selectedParkingSpot = `A0${selectedSpot + 1}`;
    navigation.navigate('Resumen', { selectedParkingSpot }); // Navega a la pantalla de resumen con el lugar seleccionado
  };

  // Genera los espacios de estacionamiento
  const renderParkingSpots = () => {
    const spots = [];
    for (let i = 0; i < 12; i++) {
      const isSelected = selectedSpot === i;
      const isOccupied = occupiedSpots.some(spot => spot.id === i);
      spots.push(
        <TouchableOpacity
          key={`parking_spot_${i}`}
          style={[styles.parkingSpot, isSelected && styles.selectedSpot]}
          onPress={() => handleParkingSpotPress(i)}
          disabled={isOccupied}
        >
          <View style={styles.parkingSpotContent}>
            {isOccupied ? (
              <Image source={carImages[occupiedSpots.find(spot => spot.id === i).carIndex]} style={styles.carImage} />
            ) : (
              <Text style={styles.spotText}>{`A0${i + 1}`}</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    }
    return spots;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estacionamiento</Text>
      <View style={styles.parkingMap}>
        <View style={styles.column}>{renderParkingSpots().slice(0, 6)}</View>
        <View style={styles.column}>{renderParkingSpots().slice(6)}</View>
      </View>
      <Text style={styles.counterText}>{availableSpots} lugares libres</Text>
      <TouchableOpacity style={styles.button} onPress={selectSpotAndNavigate}>
        <Text style={styles.buttonText}>Seleccionar</Text>
      </TouchableOpacity>
      {/* Modal de advertencia */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Necesitas seleccionar un lugar antes de continuar.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  parkingSpot: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 10,
    width: 100,
    height: 60,
    marginVertical: 5,
  },
  selectedSpot: {
    borderWidth: 2,
    borderColor: '#56D6F0',
  },
  parkingSpotContent: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#f4cd28',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#f4cd28',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ParkingDetailScreen;