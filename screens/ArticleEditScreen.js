import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import Api from '../tools';
import AsyncStorage from '@react-native-community/async-storage';


export default function ArticleEditScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id_user, setId_user] = useState('');
  const [img_url, setImg_url] = useState('');



  useEffect(() => {

    setData(route.params);
    alert(route.params.IMG_URL);
    setId(route.params.ID_ARTIKEL);
    setTitle(route.params.JUDUL);
    setContent(route.params.ISI);
    setImg_url(route.params.IMG_URL);

    // setName(data.PHOTO_URL);

  }, []);

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

  const initEdit = () => {

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
      execEdit();
    } else {
      setErrMsg(em);
    }

  }

  const execEdit = async () => {

    var body = new FormData();
    body.set('id_artikel', id);
    body.set('id_user', id_user);
    body.set('judul', title);
    body.set('isi', content);
    body.set('img_url', img_url);


    await Api.post('article/update', body)
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
        <TextInput style={styles.inputText} placeholder="Title" onChangeText={(val) => { setTitle(val) }} value={title} />
        <TextInput style={[styles.inputText, { height: 600 }]} placeholder="Content" multiline onChangeText={(val) => { setContent(val) }} value={content} />
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
