import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Platform, Image, Alert } from 'react-native';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './LoginScreen';
import ExampleScreen from './ExampleScreen';
import HomeScreen from './HomeScreen';
import AFunctionScreen from './AFunctionScreen';
import AClassScreen from './AClassScreen';
import ModIcon from '../components/ModIcon';
import LoadingScreen from './LoadingScreen';
import ExpertScreen from './ExpertScreen';
import ExpertAddScreen from './ExpertAddScreen';
import ExpertEditScreen from './ExpertEditScreen';
import SymptomScreen from './SymptomScreen';
import SymptomAddScreen from './SymptomAddScreen';
import SymptomEditScreen from './SymptomEditScreen';
import DisorderScreen from './DisorderScreen';
import DisorderAddScreen from './DisorderAddScreen';
import DisorderEditScreen from './DisorderEditScreen';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MobileAlert, DesktopAlert,ModAlert } from '../components/ModAlert';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const _isLoggedIn = false;
var _isMobile = false;
if (Platform.OS == "android" || Platform.OS == "ios") {
  _isMobile = true;
} else {
  false;
}



function DrawerIcon({ ...props }) {
  return (
    <ModIcon name={props.name} size={24} style={styles.drawerIcon} {...props} />
  );
}


function DrawerStack({ navigation }) {
  navigation.setOptions({
    headerLeft: () => (
      <Image source={require('../assets/icon.png')} style={styles.headerLogo} />
    ),
  });

  if (_isMobile) {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <ModIcon name="menu" size={24} style={{ marginEnd: 12 }} />
        </TouchableOpacity>
      ),
    });
  }

  function initLogout() {
    ModAlert('Logout',
    'Do you want to exit the app?', (() => execLogout()));
    // DesktopAlert('KEKW', () => execLogout());
  }

  async function execLogout() {
    try {
      await AsyncStorage.clear();
      await navigation.navigate('Login');
    } catch (error) {
      alert('Error occurred\n' + error);
    }
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={() => <DrawerIcon style={styles.drawerIcon} name='exit' color="tomato" />}
          labelStyle={{ width: "100%", textAlign: "right", color: "tomato", fontWeight: "bold" }}
          style={{ borderColor: "tomato", borderWidth: 2, borderRadius: 12, }}
          label="Logout" onPress={initLogout}>
        </DrawerItem>
      </DrawerContentScrollView>
    )
  }

  return (
    <Drawer.Navigator initialRouteName="Home" drawerType={(_isMobile ? "front" : "permanent")} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          drawerIcon: (props) => <DrawerIcon name='home' style={styles.drawerIcon} {...props} />,
          drawerLabel: "Home"
        }}
      />
      <Drawer.Screen
        name="Expert"
        component={ExpertScreen}
        options={{
          title: "Expert",
          drawerIcon: (props) => <MaterialCommunityIcons name="doctor" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Expert"
        }}
      />
      <Drawer.Screen
        name="Symptom"
        component={SymptomScreen}
        options={{
          title: "Symptom",
          drawerIcon: (props) => <MaterialCommunityIcons name="account-search" style={styles.drawerIcon}{...props} />,
          drawerLabel: "Symptom"
        }}
      />
      <Drawer.Screen
        name="Disorder"
        component={DisorderScreen}
        options={{
          title: "Disorder",
          drawerIcon: (props) => <MaterialCommunityIcons name="brain" style={styles.drawerIcon}{...props} />,
          drawerLabel: "Disorder"
        }}
      />
    </Drawer.Navigator>
  );
}

function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ title: "Login", headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login", headerShown: false }} />
          <Stack.Screen name="Main" component={DrawerStack} options={{ title: "MHD ADMIN" }} />
          <Stack.Screen name="DisorderAdd" component={DisorderAddScreen} options={{ title: "Add Disorder" }} />
          <Stack.Screen name="ExpertAdd" component={ExpertAddScreen} options={{ title: "Add Expert" }} />
          <Stack.Screen name="SymptomAdd" component={SymptomAddScreen} options={{ title: "Add Symptom" }} />
          <Stack.Screen name="DisorderEdit" component={DisorderEditScreen} options={{ title: "Edit Disorder" }} />
          <Stack.Screen name="ExpertEdit" component={ExpertEditScreen} options={{ title: "Edit Expert" }} />
          <Stack.Screen name="SymptomEdit" component={SymptomEditScreen} options={{ title: "Edit Symptom" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLogo: {
    width: 36,
    height: 36,
    marginStart: 24,
  },
  drawerIcon: {
    marginStart: 6
  }
});

export default MainScreen;