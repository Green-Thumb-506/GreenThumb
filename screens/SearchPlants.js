import React, { Component } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StyleSheet } from 'react-native';
import Firebase from '../config/Firebase';

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

var items = null;
Firebase.database().ref('/plantDictionary').once('value', (snapshot) => {
    items = snapshotToArray(snapshot);
})


// var items = [
//     {
//         id: 1,
//         name: 'Turks Cap Lily',
//     },
//     {
//         id: 2,
//         name: 'American Holly',
//     },
//     {
//         id: 3,
//         name: 'Mountain Laurel',
//     },
//     {
//         id: 4,
//         name: 'Annabelle Hydrangea',
//     },
//     {
//         id: 5,
//         name: 'Narrow-Leaved Sunflower',
//     },
//     {
//         id: 6,
//         name: 'Carolina Yellow Jessamine',
//     },
//     {
//         id: 7,
//         name: 'Blue False Indigo',
//     },
//     {
//         id: 8,
//         name: 'Jack-in-the-Pulpit',
//     },
//     {
//         id: 9,
//         name: 'Indian Grass',
//     },
//     {
//         id: 10,
//         name: 'Christmas Fern',
//     },
//     {
//         id: 11,
//         name: 'Wild or Eastern Red Columbine',
//     },
//     {
//         id: 12,
//         name: 'Butterfly Weed',
//     },

// ];
export default class Example extends Component {
    render() {
        return (
            <SearchableDropdown
                onTextChange={text => console.log(text)}
                onItemSelect={item => alert(JSON.stringify(item))}


                containerStyle={{ padding: 50, }}
                textInputStyle={styles.inputText}
                itemStyle={styles.item}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 250 }}
                items={items}
                placeholder="Search"
                resetValue={false}
                underlineColorAndroid="transparent"
            />

        );
    }
}

const styles = StyleSheet.create({
    inputText: {
        padding: 20,
        borderWidth: 5,
        borderColor: '#000000',
        color: '#f69b31',
        fontWeight: 'bold',
        fontSize: 40,
        borderRadius: 20,
    },
    item: {
        padding: 20,
        marginTop: 2,
        backgroundColor: '#3BAD87',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
    }
})