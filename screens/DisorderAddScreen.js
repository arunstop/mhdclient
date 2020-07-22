import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import axios from 'axios';


const api = axios.create({
  baseURL: "http://192.168.1.3/MHD-API/api/",
  // baseURL: "https://mhd-api.000webhostapp.com/api/"
})

export default function DisorderAddScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [information, setInformation] = useState('');


  const initAdd = () => {

    var success = true;
    var em = '';
    if (name.trim() === "") {
      em += ('Name cannot be empty\n');
      success = false;
    }
    if (information.trim() === "") {
      em += ('Information cannot be empty\n');
      success = false;
    }

    if (success) {
      execAdd();
    } else {
      setErrMsg(em);
    }

  }

  const execAdd = async () => {
    await api.post('disorder/add', {
      nama_penyakit: name,
      informasi: information,
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
        setName('');
        setInformation('');
        alert('Success');
        navigation.replace('Main', { screen: 'Disorder' });
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <View style={styles.container}>
        <Text style={styles.message}>{errMsg}</Text>
        <ModTextInput width="100%" placeholder="Nama penyakit" onChangeText={(val) => { setName(val) }} value={name} />
        <ModTextInput width="100%" placeholder="Informasi" multiline numberOfLines={4} onChangeText={(val) => { setInformation(val) }} value={information} />
        {/* <ModTextInput placeholder="" /> */}
        <ModButton width="100%" text="Add" onPress={() => { initAdd() }} />
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  message: {
    maxWidth: 360,
    marginTop: 24,
    color: "tomato",
    // alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
