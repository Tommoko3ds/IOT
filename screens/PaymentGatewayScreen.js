import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, Modal } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const PaymentGatewayScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    // Verificar si todos los campos están llenos
    if (cardNumber.trim() !== '' && fullName.trim() !== '' && expiry.trim() !== '' && cvv.trim() !== '') {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [cardNumber, fullName, expiry, cvv]);

  const handlePayment = () => {
    if (!allFieldsFilled) {
      Alert.alert('Por favor, complete todos los campos antes de pagar');
      return;
    }

    // Aquí iría la lógica para realizar el pago

    setModalVisible(true); // Mostrar el modal de éxito
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <Text style={styles.welcomeText}>Método de pago</Text>
            </View>
            <Text style={[styles.paymentText, { marginLeft: 20 }]}>Pago con tarjeta</Text>
            <View style={styles.totalContainer}>
              <Text style={[styles.totalLabel, { color: 'green', marginLeft: 20 }]}>Total a pagar:</Text>
              <Card style={[styles.totalButton, { backgroundColor: '#FFBA82' }]}>
                <Text style={[styles.totalText, { color: 'black' }]}>$150.00</Text>
              </Card>
            </View>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/Tarjeta-BBVA-Visa-Clasica-1.png')} style={styles.image} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Número de tarjeta"
                style={styles.input}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text)}
              />
              <TextInput
                mode="outlined"
                label="Nombre completo"
                style={styles.input}
                value={fullName}
                onChangeText={(text) => setFullName(text)}
              />
              <View style={styles.row}>
                <TextInput
                  mode="outlined"
                  label="MM/YY"
                  style={[styles.input, { flex: 1 }]}
                  value={expiry}
                  onChangeText={(text) => setExpiry(text)}
                />
                <TextInput
                  mode="outlined"
                  label="CVV"
                  style={[styles.input, { flex: 1 }]}
                  value={cvv}
                  onChangeText={(text) => setCvv(text)}
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={[styles.button, !allFieldsFilled && styles.disabledButton]}
                onPress={handlePayment}
                disabled={!allFieldsFilled} // Desactiva el botón si no todos los campos están llenos
              >
                <Text style={styles.buttonText}>Terminar apartado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de éxito */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Pago exitoso!</Text>
            <Text style={styles.modalSubtext}>Gracias por tu compra.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => { setModalVisible(false); navigation.navigate('Main'); }}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    backgroundColor: '#EFBD28',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 20,
  },
  welcomeText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  paymentText: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: 'green',
    marginRight: 10,
  },
  totalButton: {
    borderRadius: 5,
    padding: 15,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 370,
    height: 200,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#EFBD28',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5, // Reduce la opacidad del botón cuando está desactivado
  },

  // Estilos para el modal de éxito
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtext: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#EFBD28',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentGatewayScreen;
