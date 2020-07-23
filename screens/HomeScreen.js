import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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

  async function execLogout() {
    try {
      // await AsyncStorage.clear();
      // await navigation.navigate('Login');
      // await alert('Logout success');
    } catch (error) {
      alert('Error occurred\n' + error);
    }
  }
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={execLogout}
        title={"Hello, "+email+"!"}
      />
    </View>
  );
}

export default HomeScreen;