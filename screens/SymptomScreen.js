import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function SymptomScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.3/MHD-API/api/symptom/show')
      .then((response) => response.json())
      .then((data) => setData(data.data))
      // .then(data=> console.log(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
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
