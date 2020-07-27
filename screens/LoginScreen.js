import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ModButton from '../components/ModButton';
import { Card } from 'react-native-elements';
import Api from '../tools';

function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setLoading] = React.useState(true);
    // const url = 'http://192.168.1.3/MHD-API/api/user/auth'; 
    // const loginS = axios({
    //     method: 'post', url, data: { email: email, password: password, type_login: 1 }, config: {
    //         headers: {
    //             'Content-Type': 'multipart/form-data', 'Content-Type': 'application/x-www-form-urlencoded',
    //         }
    //     }
    // }).then(resp => { console.log('Submission response', resp); }).catch(err => console.error(err));

    const storeData = async (id_user) => {
        try {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            await AsyncStorage.setItem('id_user', id_user);
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
            setErrMsg(errMsg);
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

        var body = new FormData();

        body.set('email', email);
        body.set('password', password);
        body.set('type_login', 1);

        await Api.post('user/auth', body)
            .then((response) => {
                console.log(response.data);
                if (!response.data.ok) {
                    setErrMsg(response.data.message);
                } else {
                    // alert(response.data.data[0].ID_USER);
                    storeData(response.data.data[0].ID_USER)
                        .then(navigation.replace('Main'));
                }
            })
            .catch((error) => console.error(error));


        // .then((data) => setData(data.data))
        // .then(data => console.log(data.message))
        // .catch((error) => console.error(error))
        // .finally(() => navigation.replace('Main'));
    }


    return (
        <View style={styles.container} >
            <Image style={styles.logo} source={require('../assets/icon.png')} />
            <Text style={styles.label}>MHD-ADMIN</Text>
            <Text style={styles.message}>{errMsg}</Text>
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
    logo: {
        alignSelf: 'center',
        width: 180,
        height: 180,
    },
    message: {
        marginTop: 24,
        color: "red",
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        color: "limegreen",
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
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