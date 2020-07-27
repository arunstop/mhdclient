import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
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
      <DataTable.Row key={index}>
        <DataTable.Cell style={{ maxWidth: 30 }}>{(index + 1)}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.TITLE}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.CHANNEL}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>
          <FontAwesome5 name="play" size={12} color="blue" />
          <Link style={styles.link} target="_blank" to={item.URL}>
            Open on Youtube
          </Link>
        </DataTable.Cell>
        <DataTable.Cell >
          <View style={styles.btnAction}>
            <Button title="Delete" color="tomato" onPress={() => { initDelete(item.ID_VIDEO) }} />
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
          <DataTable  >
            <DataTable.Header style={styles.tableHeader}>
              <TableTitle style={styles.tableMargin} indexCol />
              <TableTitle style={styles.tableMargin} title="Title" />
              <TableTitle style={styles.tableMargin} title="Channel" />
              <TableTitle style={styles.tableMargin} title="URL" />
              <TableTitle style={styles.tableMargin} title="Action" />
            </DataTable.Header>

            {(data != null ? mapData : <View />)}

            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                console.log(page);
              }}
              label="1-2 of 6"
            />
          </DataTable>
        </ScrollView>

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
  }
});