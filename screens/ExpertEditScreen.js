import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet } from 'react-native';
import Api from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { set } from 'react-native-reanimated';

export default function ExpertEditScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {

    setData(route.params);
    setId(route.params.ID_AHLI);
    setName(route.params.NAMA_AHLI);
    setPhone(route.params.NO_TELP_AHLI);
    setAddress(route.params.ADDRESS);
    setDescription(route.params.DESCRIPTION);
    // setName(data.PHOTO_URL);

  }, []);

  const initEdit = () => {

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
      execEdit();
    } else {
      setErrMsg(em);
    }

  }

  const execEdit = async () => {

    var body = new FormData();
    body.set('id_ahli', id);
        body.set('nama_ahli', name);
        body.set('no_telp_ahli', phone);
        body.set('address', address);
        body.set('description', description);
        body.set('photo_url', 'm');

    await Api.post('psychiatrist/update', body)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);

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
        <ModButton width="100%" text="Add" onPress={() => { initEdit() }} />
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