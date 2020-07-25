import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet,Image } from 'react-native';

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
      <Button
        // onPress={execLogout}
        title={"Hello, " + email + "!"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: 180,
    height: 180,
  },
})

export default HomeScreen;