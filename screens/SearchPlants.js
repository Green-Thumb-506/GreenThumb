import React, { Component } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StyleSheet } from 'react-native';
import Firebase from '../config/Firebase';
import { withNavigation } from 'react-navigation'

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
Firebase.database().ref('/plantDictionary').on('value', (snapshot) => {
    items = snapshotToArray(snapshot);
})

class SearchPlants extends Component {
    render() {
        return (
            <SearchableDropdown
                onTextChange={text => console.log(text)}
                onItemSelect={item => this._onPressPlant(item)}
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

    _onPressPlant = (item: any) => {
      this.props.navigation.navigate('DetailedPlant', {
        plant: item,
      });
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

module.exports = withNavigation(SearchPlants);
