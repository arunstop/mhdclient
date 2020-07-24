import { PickerIOS, Picker } from '@react-native-community/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import Api from '../tools';




export default function RuleAddScreen({ navigation }) {
  // const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dataDisorder, setDataDisorder] = useState([]);
  const [dataSymptom, setDataSymptom] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [idDisorder, setIdDisorder] = useState('');
  const [idSymptom, setIdSymptom] = useState('');

  useEffect(() => {
    loadDataDisorder();
    loadDataSymptom();
  }, []);

  const loadDataDisorder = async () => {
    await Api.get('disorder/show')
      .then((response) => {
        console.log(response.data.data);
        setDataDisorder(response.data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  const mapDataDisorder = dataDisorder.map((item, index) => {
    return (
      <Picker.Item label={item.NAMA_PENYAKIT} value={item.ID_PENYAKIT} />
    )
  });

  const loadDataSymptom = async () => {
    await Api.get('symptom/showBasic')
      .then((response) => {
        console.log(response.data.data);
        setDataSymptom(response.data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  const mapDataSymptom = dataSymptom.map((item, index) => {
    return (
      <Picker.Item label={item.NAMA_GEJALA} value={item.ID_GEJALA} />
    )
  });

  const initAdd = () => {

    var success = true;
    var em = '';

    if (idDisorder.trim() === "") {
      em += ('Please select disorder\n');
      success = false;
    }
    if (idSymptom.trim() === "") {
      em += ('Please select symptom\n');
      success = false;
    }

    if (success) {
      execAdd();
      // alert(idDisorder+ " "+ idSymptom )
    } else {
      setErrMsg(em);
    }

  }

  const execAdd = async () => {

    var body = new FormData();
    body.set('id_penyakit', idDisorder);
    body.set('id_gejala', idSymptom);

    await Api.post('symptom/addRule', body)
      .then((response) => {
        console.log(response.data);
        alert('Success');
        navigation.replace('Main', { screen: 'Disorder' });
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <View style={styles.container}>
        <Text style={styles.message}>{errMsg}</Text>
        <Picker
          // selectedValue={this.state.language}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setIdDisorder(itemValue)
          }>
          <Picker.Item label="Select disorder..."/>
          {(isLoading ? <Picker.Item label="Loading data..."/>: mapDataDisorder)}
        </Picker>
        <Picker
          // selectedValue={this.state.language}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setIdSymptom(itemValue)
          }>
          <Picker.Item label="Select symptom..."/>
          {(isLoading ? <Picker.Item label="Loading data..."/>: mapDataSymptom)}
        </Picker>
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
  picker: {
    backgroundColor: "aliceblue",
    borderWidth: 2,
    borderColor: "lightsteelblue",
    paddingHorizontal: 12,
    paddingEnd: 12,
    marginTop: 24,
    height: 48,
    width: "100%",
    maxWidth: 360,
    fontWeight: "bold",
  }
});
