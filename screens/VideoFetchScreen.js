import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import { Api, ApiYoutube, ApiKeyYT } from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { DataTable } from 'react-native-paper';
import { ModAlert } from '../components/ModAlert';
import { Link, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

export default function VideoFetchScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isFetched, setFetched] = useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const [data, setData] = useState([]);

  const [keyword, setKeyword] = useState('');
  const [maxResults, setMaxResults] = useState('');

  const [id_user, setId_user] = useState('');
  var dataArray = [];


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

  const initFetch = () => {
    var success = true;
    var em = '';
    if (keyword.trim() === "") {
      em += ('Keyword cannot be empty\n');
      success = false;
    }
    if (maxResults.trim() === "") {
      em += ('Max result cannot be empty\n');
      success = false;
    } else if (maxResults <= 0 || maxResults > 25) {
      em += ('Max should be in the range of 1 - 25\n');
      success = false;
    }

    if (success) {
      loadData();
    } else {
      setErrMsg(em);
    }
  }

  const loadData = async () => {
    setFetched(true);
    await ApiYoutube.get('search.json', {
      params: {
        key: ApiKeyYT,
        safeSearch: 'strict',
        part: 'snippet',
        q: keyword,
        maxResults: maxResults
      }
    })
      .then((response) => {
        console.log(response.data.items);
        setData(response.data.items);
      })
      .catch(error => console.error(error))
      .finally(() => { setLoading(false); console.log(data) });
  }

  const initAdd = () => {
    var success = true;
    var em = '';
    if (data == null || data.length === 0) {
      em += ('No Data Added');
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

    body.set('video', JSON.stringify(dataArray));

    await Api.post('video/addFetched', body)
      .then((response) => {
        console.log(response.data);
        alert('Success');
        navigation.replace('Main', { screen: 'Video' });
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  function initDelete(start) {
    var newData = [...data]; //create copy of data
    newData.splice(start, 1); //slice(remove) an item the copy of data
    setData(newData); //replace data with the new sliced data
  }

  const mapData = data.map((item, index) => {

    var vidUrl = "https://www.youtube.com/watch?v=" + item.id.videoId;
    dataArray.push({
      id_user: id_user,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      published_at: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.medium.url,
      url: vidUrl,
    })
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell style={{ maxWidth: 30 }}>{(index + 1)}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.snippet.title}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.snippet.channelTitle}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>
          <FontAwesome5 name="play" size={12} color="blue" />
          <Link style={styles.link} target="_blank" to={vidUrl}>
            Open on Youtube
          </Link>
        </DataTable.Cell>
        <DataTable.Cell >
          <View style={styles.btnAction}>
            <Button title="Delete" color="tomato" onPress={() => { initDelete(index) }} />
          </View>
        </DataTable.Cell>
      </DataTable.Row>
    )
  });

  function TableTitle({ title, indexCol }) {

    if (indexCol) {
      return (
        <DataTable.Title style={{ maxWidth: 30 }}><Text style={styles.tableTitle}>#</Text></DataTable.Title>
      );
    } else {
      return (
        <DataTable.Title><Text style={styles.tableTitle}>{title}</Text></DataTable.Title>
      );
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={styles.message}>{errMsg}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", alignItems: "center", }}>
        <TextInput
          style={styles.inputText} placeholder="Keyword"
          onChangeText={(val) => { setKeyword(val) }}
          value={keyword} />
        <TextInput
          style={styles.inputText} placeholder="Result count"
          onChangeText={(val) => { setMaxResults(val) }}
          value={maxResults}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => { initFetch(); }}>
          <Text style={styles.txtAdd}>Fetch from Youtube</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => { initAdd(); }}>
          <Text style={styles.txtAdd}>Add to Database</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 24 }}>
        <DataTable  >
          <DataTable.Header style={styles.tableHeader}>
            <TableTitle style={styles.tableMargin} indexCol />
            <TableTitle style={styles.tableMargin} title="Title" />
            <TableTitle style={styles.tableMargin} title="Channel" />
            <TableTitle style={styles.tableMargin} title="URL" />
            <TableTitle style={styles.tableMargin} title="Action" />
          </DataTable.Header>
          {
            (
              isFetched
                ? (isLoading ? <ActivityIndicator style={{ alignSelf: "center", marginTop: 60 }} /> : mapData)
                : <View></View>
            )

          }
        </DataTable>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    maxWidth: 360,
    marginTop: 24,
    color: "tomato",
    alignSelf: 'center',
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
  btnAdd: {
    alignItems: "center",
    justifyContents: "center",
    padding: 12,
    margin: 12,
    backgroundColor: "dodgerblue",
    borderRadius: 6,
    height: 48,
  },
  txtAdd: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  inputText: {
    width: "100%",
    backgroundColor: "aliceblue",
    borderRadius: 4,
    height: 48,
    margin: 12,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "lightsteelblue",
    justifyContent: "center",
    padding: 12,
    paddingHorizontal: 18,
    fontWeight: "bold",
    color: "#000",
    maxWidth: 360,
  },
});