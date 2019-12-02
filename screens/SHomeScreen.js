import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchPlantDB, fetchUserPlants } from '../services/Api.js';
import { withNavigation } from 'react-navigation'

type State = {
  plants: any,
  userPlants: any,
  refreshing: boolean,
}

export default class SHomeScreen extends React.Component {
  state: State = {
    plants: null,
    userPlants: null,
    refreshing: false,
  }

  componentDidMount() {
    this._fetchPlants();
  }

  static navigationOptions = {
      title: 'My Garden',
      headerStyle: { backgroundColor: '#3BAD87' },
      headerTitleStyle: { fontSize: 30, height: 60, paddingTop: 10, },
  }

  render() {
      return (
          <View style={styles.container}>
            <View style={{flex: 1}}>
               {this.state.plants && this._renderFlatList()}
            </View>
          </View>
      );
  }

  _renderFlatList() {
    if (!this.state.plants) { return null; }
    // const plantDictionary = this.state.plants.plantDictionary;
    // var data = [];

    // for (var i in plantDictionary)
    //     data.push(plantDictionary[i]);
    return (
       <FlatList
          data={this.state.plants}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderCellSeperator}
          onRefresh={this._fetchPlants}
          refreshing={this.state.refreshing}
       />
    );
   }

   _renderCellSeperator() {
      return (
        <React.Fragment>
          <View style={styles.cellSeperator} />
        </React.Fragment>
      );
    }


   _renderItem = (item: any, index: number) => {
     const name = item.item.name || "";
     const imageUri = item.item.picture || "";

     return (
       <TouchableOpacity
         onPress={() => {
           /* istanbul ignore next */
           this._onPressPlant(item.item);
         }}
         key={item.id}
         style={styles.item}
       >
         <Image
           style={styles.image}
           source={{uri: imageUri}}
         />
         <View style={styles.textView}>
           <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
         </View>
         <TouchableOpacity>
            <Icon size={25} name={'ios-trash'} />
         </TouchableOpacity>
      </TouchableOpacity>
     );
   }

   /* istanbul ignore next */
   _onPressPlant = (item: any) => {
     this.props.navigation.navigate('DetailedPlant', {
       plant: item,
     });
   }

   /* istanbul ignore next */
   _keyExtractor = (item, index) => {
     return index.toString();
   }

   /* istanbul ignore next */
   _fetchPlants = async (): void => {
     var plantDb = await fetchPlantDB();
     var userPlants = await fetchUserPlants();
     this.setState({
       userPlants: userPlants || {},
     });
     var plantsArr = [];
     var s = {name: "raul", age: "22", gender: "Male"}
     var objArray = JSON.parse(userPlants);
     for (var key in objArray) {
      if (plantDb.plantDictionary[key]) {
        plantsArr.push(plantDb.plantDictionary[key]);
      }
     }
     this.setState({
       plants: plantsArr || [],
     });
   }
}

/* istanbul ignore next */
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
    },
    cellSeperator: {
      height: 5,
      width: '100%',
    },
    image: {
      height: 80,
      width: 80,
      margin: 10,
      borderRadius: 40,
    },
    item: {
        flex: 1,
        height: 100,
        backgroundColor: '#bdc3c7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 3,
        marginLeft: 10,
        marginRight: 10,
     },
     textView: {
        width: '60%',
     },
});
