import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class LoginScreen extends Component {
    
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            message: ""
        };
    }

    initLogin = () => {
        var success = true;
        var errMsg = "";

        if (this.state.email.trim() === "") {
            errMsg += "Email cannot be empty\n";
            success = false;
        } else if (!this.state.email.includes('@')) {
            errMsg += "Wrong Email format\n";
            success = false;
        }
        if (this.state.password.trim() === "") {
            errMsg += "Password cannot be empty\n";
            success = false;
        } else if (this.state.password.trim().length < 8) {
            errMsg += "Password requires minimum 8 characters\n";
            success = false;
        }
        if (success) {
            this.props.navigation.replace('Main');
        } else {
            this.setState({ message: errMsg });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.containerSub}> */}
                <Image style={styles.tinyLogo} source={require('../assets/icon.png')} />
                <Text style={styles.message}>{this.state.message}</Text>
                <TextInput
                    autoFocus
                    style={styles.inputText}
                    placeholder="Email"
                    // selectionColor="#32cd32"
                    onChangeText={(input) => this.setState({ email: input })}
                    onSubmitEditing={this.initLogin}
                    keyboardType="email-address"

                />
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    // selectionColor="#32cd32"
                    onSubmitEditing={this.initLogin}
                    onChangeText={(input) => this.setState({ password: input })}
                    secureTextEntry
                />
                <TouchableOpacity
                    onPress={this.initLogin}
                    style={styles.btn}>
                    <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>
                {/* </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: "80%",
        backgroundColor: "aliceblue",
        borderRadius: 4,
        height: 48,
        marginTop: 24,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "lightsteelblue",
        justifyContent: "center",
        padding: 12,
        paddingHorizontal:18,
        fontWeight: "bold",
        color: "gray", 
        maxWidth: 360,
    },
    btn: {
        width: "80%",
        backgroundColor: "limegreen",
        borderRadius: 24,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 42, maxWidth: 360,
    },
    btnTxt: {
        fontWeight: "bold",
        fontSize: 14,
        color: "white"
    }


});

export default LoginScreen;