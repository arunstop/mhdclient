import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import Api from '../tools';




export default function DisorderEditScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [information, setInformation] = useState('');


  useEffect(() => {

    setData(route.params);
    setId(route.params.ID_PENYAKIT);
    setName(route.params.NAMA_PENYAKIT);
    setInformation(route.params.INFORMASI);
    // setName(data.PHOTO_URL);

  }, []);

  const initEdit = () => {

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
      execEdit();
    } else {
      setErrMsg(em);
    }

  }

  const execEdit = async () => {

    var body = new FormData();

    body.set('id_penyakit', id);
    body.set('nama_penyakit', name);
    body.set('informasi', information);

    await Api.post('disorder/update', body)
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
        <ModButton width="100%" text="Confirm Edit" onPress={() => { initEdit() }} />
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
