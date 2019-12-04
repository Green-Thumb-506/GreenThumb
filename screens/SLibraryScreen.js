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
import { fetchPlantDB, addPlantUserDB } from '../services/Api.js';

type State = {
  plants: any,
  refreshing: boolean,
}

export default class SLibraryScreen extends React.Component {
  state: State = {
    plants: null,
    refreshing: false,
  }

  componentDidMount() {
    this._fetchPlants();
  }

  static navigationOptions = {
      title: 'Library',
      headerStyle: { backgroundColor: '#C85B6C' },
      headerTitleStyle: { fontSize: 40, height: 60 },
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

  /* istanbul ignore next */
  _renderFlatList() {
    if (!this.state.plants || !this.state.plants.plantDictionary) { return null; }
    const plantDictionary = this.state.plants.plantDictionary;
    var data = [];

    for (var i in plantDictionary)
        data.push(plantDictionary[i]);
    return (
       <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderCellSeperator}
          onRefresh={this._fetchPlants}
          refreshing={this.state.refreshing}
       />
    );
 }

 /* istanbul ignore next */
 _renderCellSeperator() {
    return (
      <React.Fragment>
        <View style={styles.cellSeperator} />
      </React.Fragment>
    );
  }

  /* istanbul ignore next */
 _renderItem = (item: any, index: number) => {
   const name = item.item.name || "";
   const imageUri = item.item.picture || "";
   const key = item.item.key || "";

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
       <TouchableOpacity
        onPress={() => {
          this._addPlant(key);
        }}
       >
          <Icon size={45} name={'ios-add'} />
       </TouchableOpacity>
    </TouchableOpacity>
   );
 }

 /* istanbul ignore next */
 _addPlant = async (name: string) => {
   await addPlantUserDB(name);
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
    var res = await fetchPlantDB();
    this.setState({
      plants: res || {},
    })
 }


}

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
