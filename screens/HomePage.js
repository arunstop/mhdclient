import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from '../components/ModIcon';

function HomePage({navigation}) {
    
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Icon name="menu" onPress={() => navigation.toggleDrawer()} />}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Home Page</Text>
                </View>
            </View>
        );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default HomePage;