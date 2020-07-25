import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Image } from 'react-native';

function HomeScreen({ navigation }) {
  const [email, setEmail] = React.useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email')
      if (value !== null) {
        setEmail(value);
      }
      // alert('Data passed');
    } catch (e) {
      // error reading value
      // alert('Data cannot be passed');
    }
  }

  getData();

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <Text style={styles.label}>MHD-ADMIN</Text>
      <TouchableOpacity style={styles.btnHello}>
        <Text style={styles.labelHello}>{"Hello, " + email + "!"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: 180,
    height: 180,
  },
  label: {
    color: "limegreen",
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  btnHello: {
    marginTop: 12,
    backgroundColor: "dodgerblue",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal:12,
  },
  labelHello: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  }
})

export default HomeScreen;