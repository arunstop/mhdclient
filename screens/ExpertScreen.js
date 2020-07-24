import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import Api from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { DataTable } from 'react-native-paper';
import { ModAlert } from '../components/ModAlert';



export default function ExpertScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch('http://192.168.1.3/MHD-API/api/psychiatrist/show')
    //   .then((response) => response.json())
    //   .then((data) => setData(data.data))
    //   // .then(data=> console.log(data))
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
    loadData();
  }, []);

  const loadData = async () => {
    await Api.get('psychiatrist/show')
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
    navigation.navigate('ExpertEdit', data[index]);
    // alert(data[0].NAMA_AHLI);
  }

  async function execDelete(id) {

    var body = new FormData();
    body.set('id_ahli', id);
    await Api.post(
      'psychiatrist/delete', body)
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
        <DataTable.Cell style={styles.tableMargin}>{item.NAMA_AHLI}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.NO_TELP_AHLI}</DataTable.Cell>
        <DataTable.Cell style={styles.tableMargin}>{item.ADDRESS}</DataTable.Cell>
        <DataTable.Cell>
          <View style={styles.btnAction}>
            <Button title="Edit" color="dodgerblue" onPress={() => { initEdit(index) }} /></View>
          <View style={styles.btnAction}>
            <Button title="Delete" color="tomato" onPress={() => { initDelete(item.ID_AHLI) }} />
          </View>
        </DataTable.Cell>
        {/* <DataTable.Cell onPress={() => { initEdit(index) }}></DataTable.Cell> */}
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
      <Button
        onPress={() => { navigation.navigate('ExpertAdd') }}
        title="Add"
      />
      {isLoading ? <ActivityIndicator /> : (
        <ScrollView>
          <View style={{ marginTop: 24 }}>
            <DataTable  >
              <DataTable.Header style={styles.tableHeader}>
                <TableTitle style={styles.tableMargin} indexCol />
                <TableTitle style={styles.tableMargin} title="Name" />
                <TableTitle style={styles.tableMargin} title="Phone" />
                <TableTitle style={styles.tableMargin} title="Address" />
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
