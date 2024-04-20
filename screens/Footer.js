import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.footerItem}>
        <Ionicons name="home-outline" size={28} color="#EFBD28" />
        <Text style={styles.footerText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ParkingStatus')} style={styles.footerItem}>
        <Ionicons name="car-outline" size={28} color="#EFBD28" />
        <Text style={styles.footerText}>Parking</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Nuevo')} style={styles.footerItem}>
        <Ionicons name="car-outline" size={28} color="#EFBD28" />
        <Text style={styles.footerText}>Tickets</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.footerItem}>
        <Ionicons name="person-outline" size={28} color="#EFBD28" />
        <Text style={styles.footerText}>Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
});
