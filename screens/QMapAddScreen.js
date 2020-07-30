import { PickerIOS, Picker } from '@react-native-community/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModButton from '../components/ModButton';
import ModTextInput from '../components/ModTextInput';
import Api from '../tools';




export default function QMapAddScreen({ navigation }) {
  // const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dataQuestion, setDataQuestion] = useState([]);
  const [dataChoice, setDataChoice] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [idSymptomDetail, setIdSymptomDetail] = useState('');
  const [idSymptom, setIdSymptom] = useState('');
  const [yes, setYes] = useState('');
  const [no, setNo] = useState('');

  useEffect(() => {
    loadDataQuestion();
  }, []);

  const loadDataQuestion = async () => {
    await Api.get('symptom/showQuestionnaireLite')
      .then((response) => {
        console.log(response.data.data);
        setDataQuestion(response.data.data);
        setDataChoice(response.data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  const mapDataQuestion = dataQuestion.map((item, index) => {
    return (
      <Picker.Item
        key={index}
        label={item.ID_GEJALA_DETAIL + ". " + item.PERTANYAAN}
        value={(item.ID_GEJALA_DETAIL + "," + item.ID_GEJALA)}
      />
    )
  });

  const mapDataChoice = dataChoice.map((item, index) => {
    return (
      <Picker.Item key={index}
        label={item.ID_GEJALA_DETAIL + ". " + item.PERTANYAAN}
        value={item.ID_GEJALA_DETAIL}
      />
    )
  });

  const initAdd = () => {

    var success = true;
    var em = '';

    if (idSymptomDetail.trim() === "") {
      em += ('Please select Main Question\n');
      success = false;
    }
    if (yes.trim() === "") {
      em += ('Please select If Yes Question\n');
      success = false;
    }
    if (no.trim() === "") {
      em += ('Please select If No Question\n');
      success = false;
    }

    if (success) {
      execAdd();
      // alert(idDisorder+ " "+ idSymptom )
    } else {
      setErrMsg(em);
    }

  }

  const configQPicker = (pickerValue, pickerIndex) => {
    //splitting id symptom detail and id symptom
    //because value cannot save object
    pickerValue = pickerValue.split(",");
    setIdSymptomDetail(pickerValue[0]);
    setIdSymptom(pickerValue[1]);
    // alert(pickerValue[0]);
    // alert(pickerValue[1]);
    var newDataChoice = [...dataChoice]; //create copy of data
    newDataChoice.splice(pickerIndex, 1); //slice(remove) an item the copy of data
    setDataChoice(newDataChoice); //replace data with the new sliced data
  }

  const execAdd = async () => {

    var body = new FormData();
    body.set('id_gejala_detail', idSymptomDetail);
    body.set('id_gejala', idSymptom);
    body.set('yes', yes);
    body.set('no', no);

    await Api.post('symptom/addMap', body)
      .then((response) => {
        console.log(response.data);
        if (!response.data.ok) {
          setErrMsg(response.data.message);
        } else {
          alert('Success');
          navigation.replace('Main', { screen: 'QMap' });
        }
      })
      .catch(error => console.error(error))
      .finally(() => { });
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <View style={styles.container}>
        <Text style={styles.message}>{errMsg}</Text>
        <Text style={styles.inputLabel}>Main Question : </Text>
        <Picker
          // selectedValue={this.state.language}
          style={styles.picker}
          onValueChange={(value, itemIndex) => {
            // itemIndex -1 instead of itemIndex only
            // is because there is a static children
            // labelled "Select Question..."
            configQPicker(value, itemIndex-1);
          }
          }>
          <Picker.Item label="Select Question..." />
          {(isLoading ? <Picker.Item label="Loading data..." /> : mapDataQuestion)}
        </Picker>
        <Text style={styles.inputLabel}>Next question if User chooses YES : </Text>
        <Picker
          // selectedValue={this.state.language}
          style={styles.picker}
          onValueChange={(value, itemIndex) => {
            setYes(value);
          }
          }>
          <Picker.Item label="Select Yes Question..." />
          {(isLoading ? <Picker.Item label="Loading data..." /> : mapDataChoice)}
        </Picker>
        <Text style={styles.inputLabel}>Next question if User chooses NO : </Text>
        <Picker
          // selectedValue={this.state.language}
          style={styles.picker}
          onValueChange={(value, itemIndex) => {
            setNo(value);
          }
          }>
          <Picker.Item label="Select No Question..." />
          {(isLoading ? <Picker.Item label="Loading data..." /> : mapDataChoice)}
        </Picker>
        {/* <ModTextInput placeholder="" /> */}
        <ModButton width="100%" text="Map Question" onPress={() => { initAdd() }} />
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
  inputLabel: {
    maxWidth: 360,
    marginTop: 24,
    color: "steelblue",
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
    maxWidth: 420,
    fontWeight: "bold",
  }
});
