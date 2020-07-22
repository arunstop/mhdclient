import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function ModButton({ text, width, ...props }) {


  const styles = StyleSheet.create({
    btn: {
      width,
      backgroundColor: "limegreen",
      borderRadius: 24,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
      maxWidth: 360,
      marginBottom: 24
    },
    btnTxt: {
      fontWeight: "bold",
      fontSize: 14,
      color: "white"
    }
  });

  return (
    <TouchableOpacity
      style={styles.btn}
      {...props}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
}


