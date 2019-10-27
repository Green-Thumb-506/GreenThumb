import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MyGardenPlants from './MyGardenPlants';

export default class SHomeScreen extends React.Component {

    render() {
        return (
            <View>
                <Text style={styles.container}>My Garden</Text>
                <MyGardenPlants />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 500,
        height: 50,
        fontSize: 40,
        backgroundColor: '#3BAD87',
        paddingLeft: 100
    }
});