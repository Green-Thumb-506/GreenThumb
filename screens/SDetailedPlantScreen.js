/**
 * @providesModule SDetailedPlantScreen
 * @flow
 */
"use strict";

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { addPlantUserDB } from '../services/Api.js';

type Props = {
};

type State = {
};

class SDetailedPlantScreen extends React.PureComponent<Props, State> {
  state: State = {
  };

  static navigationOptions = {
      title: 'Plant View',
      headerStyle: { backgroundColor: '#3BAD87' },
      headerBackTitle: 'Back',
      headerTitleStyle: { fontSize: 25, paddingTop: 15, height: 60 },
  }

  componentDidMount() {
  }

  render(): React$Element<any> {
    var plant = this.props.navigation && this.props.navigation.getParam('plant', null) || 0;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Image
            style={styles.image}
            source={{uri: plant.picture}}
          />
          <View style={styles.textView}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <View style={{height: 20}}/>
            <Text style={styles.plantBio}>{plant.bio}</Text>
            <Text style={styles.plantBio}>{plant.specs}</Text>
          </View>
          <TouchableOpacity
            style={styles.addPlantButton}
            onPress={() => this._addPlant(plant.key || "")}
          >
            <Text style={styles.plantBioHeader}> Add Plant </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  _addPlant = async (name: string) => {
    await addPlantUserDB(name);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc3c7',
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
  },
  plantName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  plantBioHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  plantBio: {
    fontSize: 18,
  },
  plantBioDetails: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginTop: 50,
  },
  scrollViewContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addPlantButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    minHeight: 50,
    maxHeight: 50,
    backgroundColor: '#3BAD87',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  }
});

module.exports = SDetailedPlantScreen;
