import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class SSettingsScreen extends React.Component {

    static navigationOptions = {
        title: 'Settings',
        headerStyle: { backgroundColor: '#3BAD87' },
        headerTitleStyle: { fontSize: 40, height: 60 },
    }

    render() {
        return (
            <View style={styles.container}>
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
