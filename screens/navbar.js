import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = ({ userName, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Estado para controlar la animación de desvanecimiento

  useEffect(() => {
    if (modalVisible) {
      // Anima la opacidad al abrir el modal
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Anima la opacidad al cerrar el modal
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, fadeAnim]);

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
    <View style={styles.navbar}>
      <Text style={styles.welcomeText}>Bienvenido a ParkPal, {userName ? userName : 'administrador'}!</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="settings-outline" size={28} color="#3e3e3e" />
      </TouchableOpacity>
      {/* Modal de opciones */}
      <Modal
        animationType="fade" // Cambia la animación a desvanecimiento
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleLogout} style={styles.modalItem}>
              <Ionicons name="log-out-outline" size={24} color="black" />
              <Text style={styles.modalText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalItem}>
              <Ionicons name="close-outline" size={24} color="black" />
              <Text style={styles.modalText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#f4cd28',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  welcomeText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Navbar;
