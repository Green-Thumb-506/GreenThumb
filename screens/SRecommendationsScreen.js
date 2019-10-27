import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class SRecommendationsScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Recommendations Screen</Text>
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