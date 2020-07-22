import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function DisorderScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.3/MHD-API/api/disorder/show')
      .then((response) => response.json())
      .then((data) => setData(data.data))
      // .then(data=> console.log(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
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
