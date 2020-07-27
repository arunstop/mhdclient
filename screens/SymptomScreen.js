import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';
import Api from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { DataTable } from 'react-native-paper';
import { ModAlert } from '../components/ModAlert';
import { useFocusEffect } from '@react-navigation/native';


export default function SymptomScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(//refresh when focused
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    await Api.get('symptom/showBasic')
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

  function initEdit(index) {
    navigation.navigate('SymptomEdit', data[index]);
  }

  async function execDelete(id) {

    var body = new FormData();
    body.set('id_gejala', id);

    await Api.post(
      'symptom/delete', body)
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
        <DataTable.Cell style={styles.tableMargin}>{item.NAMA_GEJALA}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.PERTANYAAN}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.KATEGORI}</DataTable.Cell>
        <DataTable.Cell >
          <View style={styles.btnAction}>
            <Button title="Edit" color="dodgerblue" onPress={() => { initEdit(index) }} />
          </View>
          <View style={styles.btnAction}>
            <Button title="Delete" color="tomato" onPress={() => { initDelete(item.ID_GEJALA) }} />
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
          onPress={() => { navigation.navigate('SymptomAdd') }}>
          <Text style={styles.txtAdd}>Add Data</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator /> : (
        <ScrollView style={{ marginTop: 24 }}>
          <DataTable  >
            <DataTable.Header style={styles.tableHeader}>
              <TableTitle style={styles.tableMargin} indexCol />
              <TableTitle style={styles.tableMargin} title="Name" />
              <TableTitle style={styles.tableMargin} title="Question" />
              <TableTitle style={styles.tableMargin} title="Category" />
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
          {/* <FlatList
          data={data}
          keyExtractor={({ ID_GEJALA }, index) => ID_GEJALA}
          renderItem={({ item }) => (
            <Text style={{color:"mediumturquoise "}} key={item.key}>{item.ID_GEJALA},{item.NAMA_GEJALA},{item.PERTANYAAN},{item.KATEGORI},{item.CREATED_AT}</Text>
          )}
        /> */}
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
  }
});
