import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Api, ApiImgur } from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { set } from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';


export default function ExpertAddScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  let [selectedImage, setSelectedImage] = useState(null);

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
      uploadImg();
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

        // setImg_url(response.data.data.link);
        execAdd(response.data.data.link);
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  const execAdd = async (imgurLink) => {

    var body = new FormData();
    body.set('nama_ahli', name);
    body.set('no_telp_ahli', phone);
    body.set('address', address);
    body.set('description', description);
    body.set('photo_url', imgurLink);

    await Api.post('psychiatrist/add', body)
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
        <View style={styles.imgPickerContainer}>
          {(selectedImage == null
            ?
            <Image
              resizeMode="cover"
              style={styles.cover, styles.emptyCover}
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
  emptyCover: {
    // backgroundColor: "skyblue ",
    borderColor: "lightsteelblue",
    borderRadius: 12,
    borderWidth: 6,
    width: "100%",
    height: "100%"
  },
  cover: {
    flex: 1,
    borderRadius: 12
  },
  imgPickerContainer: { width: 360, height: 240, justifyContent: 'center' },
  btnImgPicker: {
    backgroundColor: 'springgreen',
    // borderWidth: 6,
    padding: 12,
    borderRadius: 12,
    position: "absolute",
    alignSelf: 'center',
  },
  textBold: {
    fontSize: 14,
    color: 'white',
    fontWeight: "bold"
  },
});
