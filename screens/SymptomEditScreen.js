import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { set } from 'react-native-reanimated';

const api = axios.create({
  //baseURL: "http://192.168.1.3/MHD-API/api/",
  baseURL: "https://mhd-api.000webhostapp.com/api/"
})

export default function SymptomEditScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {

    setData(route.params);
    setId(route.params.ID_GEJALA);
    setName(route.params.NAMA_GEJALA);
    setQuestion(route.params.PERTANYAAN);
    setCategory(route.params.KATEGORI);
    // setName(data.PHOTO_URL);

  }, []);

  const initAdd = () => {

    var success = true;
    var em = '';
    if (name.trim() === "") {
      em += ('Name cannot be empty\n');
      success = false;
    }
    if (question.trim() === "") {
      em += ('Question cannot be empty\n');
      success = false;
    }
    if (category.trim() === "") {
      em += ('Category cannot be empty\n');
      success = false;
    }

    if (success) {
      execAdd();
    } else {
      setErrMsg(em);
    }

  }

  const execAdd = async () => {
    await api.get('symptom/update', {
      params: {
        id_gejala: id,
        nama_gejala: name,
        pertanyaan: question,
        kategori: category,
      }
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);

        setErrMsg('');
        setName('');
        setQuestion('');
        setCategory('');
        alert('Success');
        navigation.replace('Main', { screen: 'Symptom' });
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <View style={styles.container}>
        <Text style={styles.message}>{errMsg}</Text>
        <ModTextInput width="100%" placeholder="Nama gejala" onChangeText={(val) => { setName(val) }} value={name} />
        <ModTextInput width="100%" placeholder="Pertanyaan " multiline numberOfLines={4} onChangeText={(val) => { setQuestion(val) }} value={question} />
        <ModTextInput width="100%" placeholder="Kategori" onChangeText={(val) => { setCategory(val) }} value={category} />
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
