import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class SSearchScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Search Screen</Text>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'


    },
});