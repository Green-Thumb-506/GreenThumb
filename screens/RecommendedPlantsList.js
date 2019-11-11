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
import { fetchPlantDB } from '../services/Api.js';

type State = {
  plants: any,
  refreshing: boolean,
}

class RecommendedPlantsList extends React.Component {
  state: State = {
    plants: null,
    refreshing: false,
  }


  render() {
      var plantsList = this.props.navigation && this.props.navigation.getParam('plantsList', null) || 0;
      return (
         <View style={{flex: 1}}>
            {plantsList && this._renderFlatList()}
         </View>
      );
  }

  _renderFlatList() {
    var data = [];
    var plantsList = this.props.navigation && this.props.navigation.getParam('plantsList', null) || 0;

    for (var i in plantsList)
        data.push(plantsList[i]);
    return (
       <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderCellSeperator}
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
         onPress={() => this._onPressPlant(item.item)}
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

   _onPressPlant = (item: any) => {
     this.props.navigation.navigate('DetailedPlant', {
       plant: item,
     });
   }

   _keyExtractor = (item, index) => {
     return index.toString();
   }

   // _fetchPlants = async (): void => {
   //    var res = await fetchPlantDB();
   //    this.setState({
   //      plants: res || {},
   //    })
   // }

}

const styles = StyleSheet.create({
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
})

module.exports = RecommendedPlantsList;
