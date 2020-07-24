import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet } from 'react-native';
import Api from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { set } from 'react-native-reanimated';



export default function SymptomAddScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');

  const initAdd = () => {

    var success = true;
    var em = '';
    if (name.trim() === "") {
      em += ('Name cannot be empty\n');
      success = false;
    }
    if (question.trim() === "") {
      em += ('question cannot be empty\n');
      success = false;
    }
    if (category.trim() === "") {
      em += ('category cannot be empty\n');
      success = false;
    }

    if (success) {
      execAdd();
    } else {
      setErrMsg(em);
    }

  }

  const execAdd = async () => {

    var body = new FormData();
    body.set('nama_gejala', name);
    body.set('pertanyaan', question);
    body.set('kategori', category);

    await Api.post('symptom/add', body)
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
