import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MyGardenPlants from './MyGardenPlants';

export default class SHomeScreen extends React.Component {

    static navigationOptions = {
        title: 'My Garden',
        headerStyle: { backgroundColor: '#3BAD87' },
        headerTitleStyle: { fontSize: 30, height: 60, paddingTop: 10, },
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
      flex: 1,
      paddingTop: 10,
    }
});
