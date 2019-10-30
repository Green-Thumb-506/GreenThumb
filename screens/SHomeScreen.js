import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MyGardenPlants from './MyGardenPlants';

export default class SHomeScreen extends React.Component {

    static navigationOptions = {
        title: 'My Garden',
        headerStyle: { backgroundColor: '#3BAD87' },
        headerTitleStyle: { fontSize: 40, height: 60 },
    }

    render() {
        return (
            <View style={styles.container}>
                <MyGardenPlants />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10
    }
});