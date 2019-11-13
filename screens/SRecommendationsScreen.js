import React from 'react';
import { View, StyleSheet, Button, ScrollView, Text, TouchableOpacity } from 'react-native';
import Firebase from '../config/Firebase';
import RNPickerSelect from 'react-native-picker-select';


// Function which pulls data from Firebase and stores in array.
function recommendationsArray(snapshot) {
    var recArray = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        recArray.push(item);
    });

    return recArray;
};

// Array of plants.
var plants = null;
Firebase.database().ref('/plantDictionary').on('value', (snapshot) => {
    plants = recommendationsArray(snapshot);
});

function comparePlants(a, b) {
    //console.log(a[1])
    if (a[1] < b[1]) {
        return a[0];
    }
    return b[0];
}

function generateRecs(light, height, maitainence, season) {
    // this total will need editing!
    let userTotal = light * .6 + height * .6 + maitainence * .6 + season * .6;

    let recommendations = recommendPlantDict(plants);
    let userArr = [];
    //let sortedArray = [];
    Object.keys(recommendations).forEach(function (plantName) {
        let name = plantName;
        let total = Math.abs(userTotal - recommendations[plantName]);
        userArr.push([name, total]);

    });
    userArr.sort(function (a, b) {
        return (a[1] - b[1]);
    });

    let sortedPlant = {};
    var index = 0;
    for(var i = 0; i  < userArr.length; i++) {
        for(var j = 0; j < plants.length; j++) {
            if(userArr[i][0] === plants[j].name) {
                sortedPlant[index] = plants[j];
                index++;
                break;
            }
        }
    }
    var filteredPlants = {};
    for (var i = 0; i < 3; i++) {
      filteredPlants[i] = sortedPlant[i];
    }
    return filteredPlants;
}

// method for recommending the plant
function recommendPlantDict(plantDict) {
    let recs = plantDict;
    let recDict = {};
    for (let i in plantDict) {
        let total = 0;
        let plant = plantDict[i];

        // start of the light
        let lightTotal = 0;
        let splitLight = [];
        let flagLight = true;
        try {
            splitLight = plant.light.split(',');
        } catch {
            flagLight = false;
            lightTotal = (parseInt(plant.light, 10) + 1);
        }
        if (flagLight != false) {
            for (j in splitLight) {
                let num = 0;
                try {
                    num = parseInt(j, 10) + 1;
                } catch {
                }
                lightTotal += num;
            }
        }

        // end of the light
        // start of the season
        let seasonTotal = 0;
        let splitSeason = [];
        let flagSeason = true;
        try {
            splitSeason = plant.season.split(',');
        } catch {
            flagSeason = false;
            seasonTotal = (parseInt(plant.season, 10) + 1);
        }
        if (flagSeason != false) {
            for (j in splitSeason) {
                let num2 = 0;
                try {
                    num2 = parseInt(j, 10) + 1;
                } catch {
                }
                seasonTotal += num2;
            }
        }

        // start of the height
        let heightTotal = 0;
        try {
            heightTotal = parseFloat(plant.height, 10);
        } catch {
        }

        //start of the maitainence
        let maitTotal = 0;
        try {
            maitTotal = parseInt(plant.maitenance, 10) + 1;
            if (maitTotal.isNaN()) mainTotal = 1;
        } catch {
            maitTotal = 1;
        }
        // end of maitenance

        total += lightTotal * .6 + seasonTotal * .3 + heightTotal * .2 + maitTotal * .3;
        // total += lightTotal*.6 + maitTotal*.4 + seasonTotal*.3 + heightTotal*.2;
        recDict[plant.name] = total;
        //console.log(`${plant.name}:`, recDict[plant.name])
    }
    return recDict;
}


export default class SRecommendationsScreen extends React.Component {

    state = {
        light: 0,
        season: 0,
        maitenence: 0,
        height: 0,
        plantList: []
    };

    static navigationOptions = {
        title: 'Recommendations',
        headerStyle: { backgroundColor: '#67baf6' },
        headerTitleStyle: { fontSize: 40, height: 60 },
    }

    _renderSelectorsIfNeeded() {
      //console.warn()
      if (this.state.plantList && this.state.plantList.length != 0) { return null; }

      return (
        <ScrollView contentContainerStyle={styles.recommendationContainer}>
            <Text style={styles.inputQuest}>What is the light condition for desired location?</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        this.setState({
                            light: value,
                        })
                    }
                    }
                    items={[
                        { label: 'Sun', value: 1 },
                        { label: 'Partial Sun', value: 2 },
                        { label: 'Filtered Sunlight', value: 3 },
                        { label: 'Shade', value: 4 },
                        { label: 'Morning Sun', value: 5 }
                    ]}
                />
            </View>
            <Text style={styles.inputQuest}>How tall of a plant is desired?</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        this.setState({
                            height: value,
                        })
                    }
                    }
                    items={[
                        { label: '< 1 foot', value: 1 },
                        { label: '1 - 2 feet', value: 2 },
                        { label: '2 - 5 feet', value: 3 },
                        { label: '5 - 10 feet', value: 4 },
                        { label: '> 10 feet', value: 5 }
                    ]}
                />
            </View>
            <Text style={styles.inputQuest}>How much maintenance do you want required?</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        this.setState({
                            maintenance: value,
                        })
                    }
                    }
                    items={[
                        { label: 'Low', value: 1 },
                        { label: 'Medium', value: 2 },
                        { label: 'High', value: 3 },
                    ]}
                />
            </View>
            <Text style={styles.inputQuest}>What season would you like to plant?</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        this.setState({
                            plant: value,
                        })
                    }
                    }
                    items={[
                        { label: 'Winter', value: 1 },
                        { label: 'Spring', value: 2 },
                        { label: 'Summer', value: 3 },
                        { label: 'Fall', value: 4 },
                    ]}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    title='Submit for Recommendations'
                    onPress={() => {
                        let myList = generateRecs(this.state.light, this.state.height, this.state.maitenence, this.state.season)
                        this.props.navigation.navigate('RecommendedPlantsList', {
                          plantsList: myList,
                        });
                    }}
                />
            </View>
        </ScrollView>
      );
    }

    _renderPlantListIfNeeded() {
      if (!this.state.plantList) { return null; }

      return (
        <ScrollView>
            {
                this.state.plantList.map((item, index) => (
                    <View key={item[0]} style={styles.item}>
                        <Text style={{ fontSize: 20 }}>{item[0]}</Text>
                        <Text style={styles.comName}>{item[1].toFixed(3)}</Text>
                    </View>
                ))
            }
        </ScrollView>
      );
    }

    render() {
        return (
            <View>
                {this._renderSelectorsIfNeeded()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputQuest: {
        paddingLeft: 5,
        paddingTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        paddingTop: 40,
        width: '70%',
        color: '#2c3e50',
        paddingBottom: 30,
    },
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 0,
        fontWeight: 'bold',
        fontSize: 30,
        borderWidth: 3,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#FFF'
    },
    recommendationContainer: {
      margin: 20,
      height: '100%',
    },
})
