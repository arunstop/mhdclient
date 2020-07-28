import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import { Api, ApiYoutube, ApiKeyYT } from '../tools';
import AsyncStorage from '@react-native-community/async-storage';


export default function VideoAddScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [url, setUrl] = useState('');
  const [id_user, setId_user] = useState('');


  useEffect(() => {
    getSession();
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

  const initAdd = () => {

    var success = true;
    var em = '';
    if (url.trim() === "") {
      em += ('Vide URL cannot be empty\n');
      success = false;
    }

    if (success) {
      getVid();
    } else {
      setErrMsg(em);
    }

  }

  const getVid = async () => {

    var id = url.split('=')[1];
    
    await ApiYoutube.get('videos', {
      params: {
        key: ApiKeyYT,
        part: 'snippet',
        id: id
      }
    })
      .then((response) => {
        console.log(response.data);
        execAdd(response.data.items[0]);

      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  const execAdd = async (items) => {

    var body = new FormData();
    body.set('id_user', id_user);
    body.set('title', items.snippet.title);
    body.set('channel', items.snippet.channelTitle);
    body.set('published_at', items.snippet.publishedAt);
    body.set('thumbnail', items.snippet.thumbnails.medium.url);
    body.set('url', url);

    await Api.post('video/add', body)
      .then((response) => {
        console.log(response.data);
        alert('Success');
        navigation.replace('Main', { screen: 'Video' });
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <View style={styles.container}>
        <Text style={styles.message}>{errMsg}</Text>
        <TextInput style={styles.inputText} placeholder="Youtube Video URL" onChangeText={(val) => { setUrl(val) }} value={url} />
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
    maxWidth: 480,
  },
});
