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
import { MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import { MobileAlert, DesktopAlert, ModAlert } from '../components/ModAlert';
import RuleScreen from './RuleScreen';
import RuleAddScreen from './RuleAddScreen';
import QMapScreen from './QMapScreen';
import ArticleScreen from './ArticleScreen';
import ArticleAddScreen from './ArticleAddScreen';
import ArticleEditScreen from './ArticleEditScreen';
import VideoScreen from './VideoScreen';
import VideoAddScreen from './VideoAddScreen';
import VideoFetchScreen from './VideoFetchScreen';
import QMapAddScreen from './QMapAddScreen';
import UserScreen from './UserScreen';



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
          drawerIcon: (props) => <FontAwesome5 name='home' style={styles.drawerIcon} {...props} />,
          drawerLabel: "Home"
        }}
      />
      <Drawer.Screen
        name="Expert"
        component={ExpertScreen}
        options={{
          title: "Expert",
          drawerIcon: (props) => <Fontisto name="doctor" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Expert"
        }}
      />
      <Drawer.Screen
        name="Symptom"
        component={SymptomScreen}
        options={{
          title: "Symptom",
          drawerIcon: (props) => <MaterialCommunityIcons name="account-search" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Symptom"
        }}
      />
      <Drawer.Screen
        name="Disorder"
        component={DisorderScreen}
        options={{
          title: "Disorder",
          headerTitle: "KEKW",
          drawerIcon: (props) => <MaterialCommunityIcons name="brain" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Disorder"
        }}
      />
      <Drawer.Screen
        name="Rule"
        component={RuleScreen}
        options={{
          title: "Rule",
          drawerIcon: (props) => <MaterialCommunityIcons name="library-books" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Rule"
        }}
      />
      <Drawer.Screen
        name="QMap"
        component={QMapScreen}
        options={{
          title: "Map Questionnaire",
          drawerIcon: (props) => <MaterialCommunityIcons name="sitemap" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Map Questionnaire"
        }}
      />
      <Drawer.Screen
        name="Article"
        component={ArticleScreen}
        options={{
          title: "Article",
          drawerIcon: (props) => <FontAwesome5 name="newspaper" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Article"
        }}
      />
      <Drawer.Screen
        name="Video"
        component={VideoScreen}
        options={{
          title: "Featured Video",
          drawerIcon: (props) => <FontAwesome5 name="youtube" style={styles.drawerIcon} {...props} />,
          drawerLabel: "Video"
        }}
      />
      <Drawer.Screen
        name="User"
        component={UserScreen}
        options={{
          title: "User",
          drawerIcon: (props) => <FontAwesome5 name="users" style={styles.drawerIcon} {...props} />,
          drawerLabel: "User"
        }}
      />
    </Drawer.Navigator>
  );
}

function MainScreen({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ title: "Loading", headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login", headerShown: false }} />
          <Stack.Screen name="Main" component={DrawerStack} options={{ title: "MHD ADMIN" }} />
          <Stack.Screen name="ArticleAdd" component={ArticleAddScreen} options={{ title: "Add Article" }} />
          <Stack.Screen name="ArticleEdit" component={ArticleEditScreen} options={{ title: "Edit Article" }} />
          <Stack.Screen name="DisorderAdd" component={DisorderAddScreen} options={{ title: "Add Disorder" }} />
          <Stack.Screen name="DisorderEdit" component={DisorderEditScreen} options={{ title: "Edit Disorder" }} />
          <Stack.Screen name="ExpertAdd" component={ExpertAddScreen} options={{ title: "Add Expert" }} />
          <Stack.Screen name="ExpertEdit" component={ExpertEditScreen} options={{ title: "Edit Expert" }} />
          <Stack.Screen name="QMapAdd" component={QMapAddScreen} options={{ title: "Edit Symptom" }} />
          <Stack.Screen name="RuleAdd" component={RuleAddScreen} options={{ title: "Add Rule" }} />
          <Stack.Screen name="SymptomAdd" component={SymptomAddScreen} options={{ title: "Add Symptom" }} />
          <Stack.Screen name="SymptomEdit" component={SymptomEditScreen} options={{ title: "Edit Symptom" }} />
          <Stack.Screen name="VideoAdd" component={VideoAddScreen} options={{ title: "Add Video" }} />
          <Stack.Screen name="VideoFetch" component={VideoFetchScreen} options={{ title: "Fetch Video" }} />
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
    marginStart: 6,
  }
});

export default MainScreen;