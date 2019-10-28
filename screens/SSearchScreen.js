import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import SearchPlants from './SearchPlants'

export default class SSearchScreen extends React.Component {

    render() {
        return (


            <View>
                <ImageBackground source={require('../images/plant-search-background.jpg')} style={{

                    height: 750,
                    width: 750,
                    position: 'absolute',
                    resizeMode: 'cover',
                    flex: 1,
                    top: 0,
                    left: 0
                }} >
                </ImageBackground>
                <Text style={{
                    width: 500, height: 90, fontSize: 30, backgroundColor: '#3BAD87', paddingLeft: 10,
                    paddingTop: 40
                }}>GreenThumb Database</Text>
                <SearchPlants />
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