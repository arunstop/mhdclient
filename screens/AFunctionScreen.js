import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AFunctionScreen() {
  return (
    <View style={styles.container}>
      <Text>This is a function sample screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});