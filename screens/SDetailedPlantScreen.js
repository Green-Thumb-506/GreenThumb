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
} from 'react-native';

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
          </View>
          <View style={styles.textView}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={styles.plantBioHeader}>{"Maintenance: "}</Text>
              <Text style={styles.plantBioDetails}>{plant.maintenance + "/10"}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={styles.plantBioHeader}>{"Water: "}</Text>
              <Text style={styles.plantBioDetails}>{plant.water + "/10"}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={styles.plantBioHeader}>{"Season: "}</Text>
              <Text style={styles.plantBioDetails}>{plant.season}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

module.exports = SDetailedPlantScreen;