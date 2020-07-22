import React from 'react';
import { Platform,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Icon({ name, ...props }) {
  name = name.trim();
  return (
    <Ionicons
      name={Platform.OS == 'ios' ? `ios-${name}` : `md-${name}`}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
  },
});