import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { set } from 'react-native-reanimated';

const api = axios.create({
  baseURL: "http://192.168.1.3/MHD-API/api/",
  // baseURL: "https://mhd-api.000webhostapp.com/api/"
})

export default function PsychiatristScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const initAdd = () => {

    var success = true;
    var em = '';
    if (name.trim() === "") {
      em += ('Name cannot be empty\n');
      success = false;
    }
    if (phone.trim() === "") {
      em += ('Phone cannot be empty\n');
      success = false;
    }
    if (address.trim() === "") {
      em += ('Address cannot be empty\n');
      success = false;
    }
    if (description.trim() === "") {
      em += ('Description cannot be empty\n');
      success = false;
    }

    if (success) {
      execAdd();
    } else {
      setErrMsg(em);
    }

  }

  const execAdd = async () => {
    await api.post('psychiatrist/add', {
      nama_ahli: name,
      no_telp_ahli: phone,
      address: address,
      description: description,
      photo_url: 'm',
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);

        setName('');
        setErrMsg('');
        setPhone('');
        setAddress('');
        setDescription('');
        alert('Success');
        navigation.replace('Main', { screen: 'Expert' });
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <View style={styles.container}>
        <Text style={styles.message}>{errMsg}</Text>
        <ModTextInput width="100%" placeholder="Nama ahli" onChangeText={(val) => { setName(val) }} value={name} />
        <ModTextInput width="100%" keyboardType="phone-pad" placeholder="Phone number" onChangeText={(val) => { setPhone(val) }} value={phone} />
        <ModTextInput width="100%" placeholder="Address" multiline numberOfLines={4} onChangeText={(val) => { setAddress(val) }} value={address} />
        <ModTextInput width="100%" placeholder="Description" multiline numberOfLines={4} onChangeText={(val) => { setDescription(val) }} value={description} />
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
