import React from 'react';
import { Platform,StyleSheet,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModTextInput({width , ...props }) {
  
  const styles = StyleSheet.create({
    inputText: {
      width,
      backgroundColor: "aliceblue",
      borderRadius: 4,
      // height: 48,
      marginTop: 24,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: "lightsteelblue",
      justifyContent: "center",
      padding: 12,
      paddingHorizontal: 18,
      fontWeight: "bold",
      color: "#000",
      maxWidth: 360,
  },
  });
  
  return (
    <TextInput
    style={styles.inputText}
      {...props}
    />
  );
}