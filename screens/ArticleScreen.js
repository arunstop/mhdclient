import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import Api from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { DataTable } from 'react-native-paper';
import { ModAlert } from '../components/ModAlert';
import { Link, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';


export default function ArticleScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [initData, setInitData] = useState([]);
  // const [keyword, setKeyword] = useState('');
  var keyword = '';

  useFocusEffect(//refresh when focused
    React.useCallback(() => {
      loadData();
    }, [])
  );

  var loadData = async () => {
    await Api.get('article/show')
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setInitData(response.data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  function initDelete(id) {
    ModAlert("Delete data", "Do you want to delete this data?", (() => execDelete(id)));
  }

  function initEdit(index) {
    // alert(data[index].JUDUL);
    navigation.navigate('ArticleEdit', data[index]);
  }

  async function execDelete(id) {

    var body = new FormData();
    body.set('id_artikel', id);

    await Api.post('article/delete', body)
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


  function searchData() {
    alert(keyword);
    if (keyword === "") {
      return (setData(initData));
    }
    const result = data.filter(word =>
      word.JUDUL.toLowerCase().includes(keyword));

    console.log(result);
    return (setData(result));
  }


  const mapData = data.map((item, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell style={{ maxWidth: 30 }}>{(index + 1)}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.JUDUL}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.ISI}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>
          <FontAwesome5 name="eye" size={12} color="blue" />
          <Link style={styles.link} target="_blank" to={item.IMG_URL}>
            Thumbnail
          </Link>
        </DataTable.Cell>
        <DataTable.Cell >
          <View style={styles.btnAction}>
            <Button title="Edit" color="dodgerblue" onPress={() => { initEdit(index) }} />
          </View>
          <View style={styles.btnAction}>
            <Button title="Delete" color="tomato" onPress={() => { initDelete(item.ID_ARTIKEL) }} />
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
      <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => { navigation.navigate('ArticleAdd') }}>
          <Text style={styles.txtAdd}>Add Data</Text>
        </TouchableOpacity>
        <TextInput style={styles.inputText} width="100%" placeholder="Search...." onChangeText={(val) => { keyword = val }} />
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => { searchData() }}>
          <Text style={styles.txtAdd}>Search</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator /> : (
        <View style={{ marginTop: 24 }}>
          <DataTable  >
            <DataTable.Header style={styles.tableHeader}>
              <TableTitle style={styles.tableMargin} indexCol />
              <TableTitle style={styles.tableMargin} title="Title" />
              <TableTitle style={styles.tableMargin} title="Content" />
              <TableTitle style={styles.tableMargin} title="Thumbnail" />
              <TableTitle style={styles.tableMargin} title="Action" />
            </DataTable.Header>

            {mapData}

            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                console.log(page);
              }}
              label="1-2 of 6"
            />
          </DataTable>
        </View>

      )}
    </View>
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
  btnAdd: {
    margin: 12,
    padding: 12,
    backgroundColor: "dodgerblue",
    borderRadius: 6,
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
});