import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View, StyleSheet,Button } from 'react-native';
import axios from 'axios';
import ModTextInput from '../components/ModTextInput';
import ModButton from '../components/ModButton';
import { set } from 'react-native-reanimated';

const api = axios.create({
  // baseURL: "http://192.168.1.3/MHD-API/api/",
  baseURL: "https://mhd-api.000webhostapp.com/api/"
})

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
    loadDataExpert();
  }, []);

  const loadDataExpert = async () => {
    await api.get('psychiatrist/show')
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

 

  return (
    <View style={{ flex: 1, padding: 24 }}>
     <Button
        onPress={() => {navigation.navigate('ExpertAdd')}}
        title="Add"
      />
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ ID_AHLI }, index) => ID_AHLI}
          renderItem={({ item }) => (
            <Text key={item.key}>{item.ID_AHLI},,{item.NAMA_AHLI}, {item.NO_TELP_AHLI}, {item.ADDRESS}, {item.DESCRIPTION}, {item.PHOTO_URL}, {item.CREATED_AT}, </Text>
          )}
        />
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
});
