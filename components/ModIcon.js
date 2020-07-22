import React from 'react';
import { Platform } from 'react-native';
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
