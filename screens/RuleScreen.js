import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import Api from '../tools';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { DataTable } from 'react-native-paper';
import { ModAlert } from '../components/ModAlert';
import { useFocusEffect } from '@react-navigation/native';


export default function RuleScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(//refresh when focused
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    await Api.get('symptom/showRule')
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
    navigation.navigate('RuleAdd', data[index]);
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
      <View style={styles.viewRowParent} key={index}>
        {mapRule(item.RULE)}
        <View style={{flexDirection: 'row',flexWrap: 'wrap', width: "100%"}}>
          <Chip title="THEN" color="limegreen" />
          <View style={{ justifyContent: 'center', }}>
            <Text style={{ fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "#000" }}>{item.NAMA_PENYAKIT.toUpperCase()}</Text>
          </View></View>
      </View>
    )
  });

  function mapRule(ruleList) {
    const rule = ruleList.map((data, index) => {
      return (
        <View style={styles.viewRow} key={index}>
          {
            index === 0
              ? <Chip title="IF" color="goldenrod" />
              : <Chip title="AND" color="dodgerblue" />
          }
          <View style={{ justifyContent: 'center', }}>
            <Text>{data}</Text>
          </View>
        </View>
      )
    });
    return (rule);
  }

  function Chip({ color, title }) {
    return (
      <Text style={[styles.chip, { color: color, borderColor: color, }]}>{title}</Text>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button
        onPress={() => { navigation.navigate('RuleAdd') }}
        title="Add"
      />
      {isLoading ? <ActivityIndicator /> : (
        <ScrollView style={{ marginTop: 24 }}>
          {mapData}
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
  viewRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewRowParent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 12,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    margin: 6
  },
  chip: {
    borderWidth: 2,
    borderRadius: 6,
    padding: 6,
    margin: 6,
    fontWeight: "bold",
  }
});
