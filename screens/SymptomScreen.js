import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button } from 'react-native';
import axios from 'axios';


const api = axios.create({
  // baseURL: "http://192.168.1.3/MHD-API/api/",
  baseURL: "https://mhd-api.000webhostapp.com/api/"
});


export default function SymptomScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadDataSymptom();
  }, []);

  const loadDataSymptom = async () => {
    await api.get('symptom/show')
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
        onPress={() => {navigation.navigate('SymptomAdd')}}
        title="Add"
      />
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ ID_GEJALA }, index) => ID_GEJALA}
          renderItem={({ item }) => (
            <Text style={{color:"mediumturquoise "}} key={item.key}>{item.ID_GEJALA},{item.NAMA_GEJALA},{item.PERTANYAAN},{item.KATEGORI},{item.CREATED_AT}</Text>
          )}
        />
      )}
    </View>
  );
};
