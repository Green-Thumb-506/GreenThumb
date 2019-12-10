import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import SearchPlants from './SearchPlants'

export default class SSearchScreen extends React.Component {

    static navigationOptions = {
        title: 'Search Plants',
        headerStyle: { backgroundColor: '#3BAD87' },
        headerTitleStyle: { fontSize: 30, height: 40 },
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../images/plant-search-background.jpg')} style={styles.image} />
                <SearchPlants />
            </View>
        );

    }

}

const styles = StyleSheet.create({
    image: {
        height: 750,
        width: 750,
        position: 'absolute',
        resizeMode: 'cover',
        flex: 1,
        top: 0,
        left: 0
    }
});
