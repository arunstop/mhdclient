import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import Api from '../tools';
import AsyncStorage from '@react-native-community/async-storage';


export default function ArticleAddScreen({  navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id_user, setId_user] =useState('');



  const getSession = async () => {
    try {
      const id = await AsyncStorage.getItem('id_user');
      if (id !== null) {
        setId_user(id);
      }
      // alert('Data passed');
    } catch (e) {
      // error reading value
      // alert('Data cannot be passed');
    }
  }

  useEffect(() => {
    getSession();
  }, []);

  const initAdd = () => {

    var success = true;
    var em = '';
    if (title.trim() === "") {
      em += ('Title cannot be empty\n');
      success = false;
    }
    if (content.trim() === "") {
      em += ('Content cannot be empty\n');
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
    body.set('id_user', id_user);
    body.set('judul', title);
    body.set('isi', content);
    body.set('img_url', 'x');


    await Api.post('article/add', body)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
        setTitle('');
        setContent('');
        alert('Success');
        navigation.replace('Main', { screen: 'Article' });
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <View style={styles.container}>
        <Text style={styles.message}>{errMsg}</Text>
        <TextInput style={styles.inputText} placeholder="Title" onChangeText={(val) => { setTitle(val) }} initvalue={title} />
        <TextInput style={[styles.inputText, { height: 600 }]} placeholder="Content" multiline onChangeText={(val) => { setContent(val) }} value={content} />
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
  inputText: {
    width: "100%",
    backgroundColor: "aliceblue",
    borderRadius: 4,
    // height: 48,
    marginTop: 24,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "lightsteelblue",
    justifyContent: "center",
    padding: 12,
    paddingHorizontal: 18,
    fontWeight: "bold",
    color: "#000",
    maxWidth: 720,
  },
});
