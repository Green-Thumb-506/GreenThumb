import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MyGardenPlants from './MyGardenPlants';

export default class SLibraryScreen extends React.Component {

    static navigationOptions = {
        title: 'Library',
        headerStyle: { backgroundColor: '#C85B6C' },
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
      flex: 1,
      paddingTop: 10,
    },
});
