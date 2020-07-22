import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';


const api = axios.create({
  // baseURL: "http://192.168.1.3/MHD-API/api/",
  baseURL: "https://mhd-api.000webhostapp.com/api/"
});

export default function DisorderScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch('http://192.168.1.3/MHD-API/api/psychiatrist/show')
    //   .then((response) => response.json())
    //   .then((data) => setData(data.data))
    //   // .then(data=> console.log(data))
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
    loadDataDisorder();
  }, []);

  const loadDataDisorder = async () => {
    await api.get('disorder/show')
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
{/* <Picker
  selectedValue="java"
  style={{height: 50, width: 100}}
  // onValueChange={(itemValue, itemIndex) =>
  //   this.setState({language: itemValue})
  // }
  >
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker> */}

    <Button
        onPress={() => {navigation.navigate('DisorderAdd')}}
        title="Add"
      />
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ ID_PENYAKIT }, index) => ID_PENYAKIT}
          renderItem={({ item }) => (
            <Text key={item.key}>{item.ID_PENYAKIT},{item.NAMA_PENYAKIT},{item.INFORMASI},{item.CREATED_AT},</Text>
          )}
        />
      )}
    </View>
  );
};
