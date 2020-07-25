import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native-elements';

export default function ModLogo({ size, ...props }) {
    return (
        <Image
            source={require('../assets/icon.png')}
            style={{ width: size, height: size }}
            {...props}
        />
    );
}
