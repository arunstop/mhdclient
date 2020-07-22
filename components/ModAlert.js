import React from 'react';
import { Alert, Platform } from 'react-native';

var isMobile = false;
if (Platform.OS == "android" || Platform.OS == "ios") {
    isMobile = true;
} else {
    false;
}

export const MobileAlert = (title, desc, onPositivePress = () => { }) => {
    Alert.alert(
        title,
        desc,
        [
            { text: 'OK', onPress: () => onPositivePress() },
            { text: 'CANCEL', onPress: () => {} },
        ],
        { cancelable: true }
    );
}

export const DesktopAlert = (desc, onPositivePress = () => { }) => {
    var pop = confirm(desc);
    if (pop) { onPositivePress(); }
    else {  }
}

export const ModAlert = (title, desc, onPositivePress = () => { }) => {
    if (isMobile) {
        MobileAlert(title, desc, () => onPositivePress());
    } else {
        DesktopAlert(desc, () => onPositivePress());
    }
}