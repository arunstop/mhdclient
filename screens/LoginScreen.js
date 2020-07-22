import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ModButton from '../components/ModButton';
import { Card } from 'react-native-elements';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.1.3/MHD-API/api/"
});

function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isLoading, setLoading] = React.useState(true);
    // const url = 'http://192.168.1.3/MHD-API/api/user/auth'; 
    // const loginS = axios({
    //     method: 'post', url, data: { email: email, password: password, type_login: 1 }, config: {
    //         headers: {
    //             'Content-Type': 'multipart/form-data', 'Content-Type': 'application/x-www-form-urlencoded',
    //         }
    //     }
    // }).then(resp => { console.log('Submission response', resp); }).catch(err => console.error(err));

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            // alert('Data Saved');
            return true;
        }
        catch (e) {
            // alert('Failed to save data\n' + e);
            return false;
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('email')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    const initLogin = () => {
        var success = true;
        var errMsg = "";

        if (email.trim() === "") {
            errMsg += "Email cannot be empty\n";
            success = false;
        } else if (!email.includes('@')) {
            errMsg += "Wrong Email format\n";
            success = false;
        }
        if (password.trim() === "") {
            errMsg += "Password cannot be empty\n";
            success = false;
        } else if (password.trim().length < 8) {
            errMsg += "Password requires minimum 8 characters\n";
            success = false;
        }
        if (success) {
            execLogin();
        } else {
            setMessage(errMsg);
        }
    }

    const execLogin = async () => {
        // fetch('http://192.168.1.3/MHD-API/api/user/auth', {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     redirect: 'follow',
        //     credentials: 'same-origin',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json;charset=UTF-8'
        //     }, body: JSON.stringify(ddata)
        // })
        //     .then((response) => response.json())
        //     .then((data) => setData(data.data))
        //     .then(data => console.log(data))
        //     .catch((error) => console.error(error))
        //     .finally(() => setLoading(false));

        await api.post(
            'user/auth',
            {
                email: email,
                password: password,
                type_login: 1
            },
        )
            .then((response) => {
                console.log(response.data);
                if (!response.data.ok) {
                    setMessage(response.data.message);
                } else {
                    storeData();
                    navigation.replace('Main');
                }
            })
            .catch((error) => console.error(error));


        // .then((data) => setData(data.data))
        // .then(data => console.log(data.message))
        // .catch((error) => console.error(error))
        // .finally(() => navigation.replace('Main'));
    }

    
    return (

        // <View style={styles.container}>
        //     <Card>
        //     <Image style={styles.tinyLogo} source={require('../assets/icon.png')} />
        //         <Text style={styles.message}>{message}</Text>
        //         <TextInput
        //             autoFocus
        //             style={styles.inputText}
        //             placeholder="Email"
        //             // selectionColor="#32cd32"
        //             onChangeText={(input) => { setEmail(input) }}
        //             onSubmitEditing={initLogin}
        //             keyboardType="email-address"
        //         />
        //         <TextInput
        //             style={styles.inputText}
        //             placeholder="Password"
        //             // selectionColor="#32cd32"
        //             onSubmitEditing={initLogin}
        //             onChangeText={(input) => { setPassword(input) }}
        //             secureTextEntry
        //         />
        //         <ModButton
        //             text="Login"
        //             onPress={initLogin}>
        //         </ModButton>
        //     </Card>
        // </View>

        <View style={styles.container} >
            <Image style={styles.tinyLogo} source={require('../assets/icon.png')} />
            <Text style={styles.message}>{message}</Text>
            <TextInput
                autoFocus
                style={styles.inputText}
                placeholder="Email"
                // selectionColor="#32cd32"
                onChangeText={(input) => { setEmail(input) }}
                onSubmitEditing={initLogin}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.inputText}
                placeholder="Password"
                // selectionColor="#32cd32"
                onSubmitEditing={initLogin}
                onChangeText={(input) => { setPassword(input) }}
                secureTextEntry
            />
            <ModButton
                width="72%"
                text="Login"
                onPress={initLogin}>
            </ModButton>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
    card: {
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    containerSub: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        maxWidth: 360
    },
    tinyLogo: {
        alignSelf: 'center',
        width: 60,
        height: 60,
    },
    message: {
        marginTop: 24,
        color: "red",
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputText: {
        width: "72%",
        backgroundColor: "aliceblue",
        borderRadius: 4,
        height: 48,
        marginTop: 24,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "lightsteelblue",
        justifyContent: "center",
        padding: 12,
        paddingHorizontal: 18,
        fontWeight: "bold",
        color: "gray",
        maxWidth: 360,
    },
});

export default LoginScreen;