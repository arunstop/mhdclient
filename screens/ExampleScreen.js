import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function ExampleScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.3/MHD-API/api/note/show?id_user=1')
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
          keyExtractor={({ id }, index) => ID_CATATAN}
          renderItem={({ item }) => (
            <Text>{item.JUDUL_CATATAN}, {item.ISI_CATATAN}</Text>
          )}
        />
      )}
    </View>
  );
};
