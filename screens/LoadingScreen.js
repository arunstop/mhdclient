import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ModLogo from '../components/ModLogo';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native';

export default function LoadingScreen({ navigation }) {

  const sessionCheck = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        navigation.replace('Main');
      }else{
        navigation.replace('Login');
      }

    } catch (e) {
      // error reading value
      alert('Data cannot be passed');
    }
  }
  sessionCheck();

  return (
    <View style={styles.container}>
      <Text></Text>
      {/* <ActivityIndicator/> */}
      <ModLogo size={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});