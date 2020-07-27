import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import { Api, ApiImgur } from '../tools';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';


export default function ArticleEditScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id_user, setId_user] = useState('');
  const [img_url, setImg_url] = useState('');
  let [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {

    getSession();
    setData(route.params);
    // alert(route.params.IMG_URL);
    setId(route.params.ID_ARTIKEL);
    setTitle(route.params.JUDUL);
    setContent(route.params.ISI);
    setImg_url(route.params.IMG_URL);
    // alert(route.params.IMG_URL);

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


  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };


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
      if (selectedImage != null) {
        uploadImg();
      } else {
        execEdit(null);
      }
    } else {
      setErrMsg(em);
    }

  }

  const uploadImg = async () => {
    var body = new FormData();

    //splitting base64 from uri
    // from this: 
    // data:image/png;base64,iVBORw0KGg...
    // split the comma      ^
    // to this
    // iVBORw0KGg...
    var img = selectedImage.localUri;
    img = img.split(",");
    img = img[1];

    body.set('image', img);

    await ApiImgur.post('image.json', body)
      .then((response) => {
        console.log(response.data);

        // alert(response.data.data.link);
        setImg_url(response.data.data.link);
        execEdit(response.data.data.link);
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  const execEdit = async (imgurLink) => {

    var body = new FormData();
    body.set('id_artikel', id);
    body.set('id_user', id_user);
    body.set('judul', title);
    body.set('isi', content);
    if (imgurLink != null) {
      body.set('img_url', imgurLink);
    }


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
        <View style={styles.imgPickerContainer}>
          {(selectedImage == null
            ?
            <Image
              resizeMode="cover"
              style={styles.cover}
              source={{ uri: img_url }}
            />
            :
            <Image
              resizeMode="cover"
              style={styles.cover}
              source={{ uri: selectedImage.localUri }}
            />
          )}
          <TouchableOpacity onPress={openImagePickerAsync} style={styles.btnImgPicker}>
            <Text style={styles.textBold}>Select Thumbnail...</Text>
          </TouchableOpacity>
        </View>
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
  cover: {
    flex: 1,
    borderRadius: 12
  },
  imgPickerContainer: { width: 720, height: 480, justifyContent: 'center' },
  btnImgPicker: {
    borderColor: 'dodgerblue',
    borderWidth: 6,
    padding: 12,
    borderRadius: 12,
    position: "absolute",
    alignSelf: 'center',
  },
  textBold: {
    fontSize: 18,
    color: 'dodgerblue',
    fontWeight: "bold"
  },
});
