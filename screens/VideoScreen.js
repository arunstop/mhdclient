import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Api, ApiYoutube } from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { DataTable } from 'react-native-paper';
import { ModAlert } from '../components/ModAlert';
import { Link, useFocusEffect } from '@react-navigation/native';
import { Linking } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';

export default function VideoScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    await Api.get('video/show',)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  function initDelete(id) {
    ModAlert("Delete data", "Do you want to delete this data?", (() => execDelete(id)));
  }

  async function execDelete(id) {

    var body = new FormData();
    body.set('id_video', id);

    await Api.post('video/delete', body)
      .then((response) => {
        console.log(response.data);
        if (!response.data.ok) {
          // setMessage(response.data.message);
        } else {

          setLoading(true);
          loadData();
        }
      })
      .catch((error) => console.error(error));
  }

  const mapData = data.map((item, index) => {
    return (
      <TouchableOpacity style={styles.videoThumbnail} key={index} onPress={() => window.open(item.URL, '_blank')}>
        <Image
          resizeMode="cover"
          style={styles.cover}
          source={{ uri: item.THUMBNAIL }}
        />
        <View style={styles.videoLabel}>
          <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode='tail'>{item.TITLE}</Text>
          <Text style={styles.videoChannel} numberOfLines={1} ellipsizeMode='tail'>{item.CHANNEL}</Text>
        </View>
        <TouchableOpacity style={styles.btnDel} onPress={() => { initDelete(item.ID_VIDEO) }}>
          <FontAwesome5
            name="trash"
            size={18}
            color="orangered"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  });

  return (
    <View style={{ flex: 1, padding: 24, }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => { navigation.navigate('VideoAdd') }}>
          <Text style={styles.txtAdd}>Add Manually</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => { navigation.navigate('VideoFetch') }}>
          <Text style={styles.txtAdd}>Fetch from Youtube</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? <ActivityIndicator /> : (
        <ScrollView style={{ marginTop: 24 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: 'center' }}>
            {(data != null ? mapData : <View />)}
          </View>
        </ScrollView>
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    maxWidth: 360,
    marginTop: 24,
    color: "orangered",
    // alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnAdd: {
    margin: 12,
    padding: 12,
    backgroundColor: "dodgerblue",
    borderRadius: 6,
  },
  txtAdd: {
    color: "white",
    fontWeight: "bold",
  },
  tableTitle: {
    color: "black",
    fontWeight: "bold"
  },
  tableMargin: {
    marginEnd: 12,
  },
  tableHeader: {
    backgroundColor: "lightskyblue", borderBottomWidth: 2, borderBottomColor: "deepskyblue"
  },
  btnAction: {
    marginEnd: 12,
  },
  link: {
    marginStart: 6,
    color: "blue",
    borderBottomColor: "blue",
    borderBottomWidth: 1
  },
  txtAdd: {
    color: "white",
    fontWeight: "bold",
  },
  cover: {
    flex: 1,
    borderRadius: 12
  },
  videoThumbnail: {
    margin: 6,
    width: 270,
    height: 180,
    // flexDirection: "column",
    // justifyContent: 'center'
  },
  videoLabel: {
    position: "absolute",
    width: "100%",
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    bottom: 0,
  },
  videoTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  videoChannel: {
    color: "lightgray",
    fontWeight: "400",
    fontSize: 12
  },
  btnDel: {
    justifyContent:'center',
    alignItems:'center',
    width:30,
    height:30,
    // borderRadius: 42,
    // borderWidth: 2,
    // borderColor:"orangered",
    // backgroundColor:"white",
    margin: 6,
    padding: 6,
    position: "absolute",
    end: 0,
  }
});