import React from 'react';
import { View, StyleSheet, Button, ScrollView, Text, TouchableOpacity } from 'react-native';
import Firebase from '../config/Firebase';
//import FilterResults from 'react-filter-search';
import SearchableDropdown from 'react-native-searchable-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import { thisTypeAnnotation } from '@babel/types';




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

function comparePlants(a, b){
    //console.log(a[1])
    if (a[1] < b[1]) {
        return a[0];
    }
    return b[0];
  }

function generateRecs(light, height, maitainence, season) {
    // this total will need editing!
    let userTotal = light*.6 + height*.6 + maitainence*.6 + season*.6;
    //console.log("Here is Jon's Total:", userTotal);
    let recommendations = recommendPlantDict(plants);
    let userArr = [];
    let sortedArray = [];
    Object.keys(recommendations).forEach(function(plantName) {
        let name = plantName;
        let total = userTotal - recommendations[plantName];
        //console.log([name, total])
        userArr.push([name, total]);
        sortedArray.push([name, total]);
        

    });
        sortedArray = userArr.sort(function (a, b) {
        console.log(a[1], b[1]);
        return (Math.abs(a[1] - b[1]));
      });
    //console.log(sortedArray);
    // let userArr = [];
    // for (let recKey in Object.keys(recommendations)) {
    //     let name = recKey;
    //     console.log(name)
    //     let total = userTotal - recommendations[recKey];
    //     userArr.push([name, total]);
    //     //console.log(userArr);
    // }


    return sortedArray;
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
            lightTotal = (parseInt(plant.light,10)+1); 
            //console.log("Only one light specified");
        }
        if (flagLight != false) {
            for (j in splitLight) {
                let num = 0;
                try {
                    num = parseInt(j, 10) + 1;
                } catch {
                    //console.log("not a valid integer!");
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
            seasonTotal = (parseInt(plant.season,10)+1); 
            //console.log("Only one season specified");
        }
        if (flagSeason != false) {
            for (j in splitSeason) {
                let num2 = 0;
                try {
                    num2 = parseInt(j, 10) + 1;
                } catch {
                    //console.log("not a valid integer!");
                }
                seasonTotal += num2;
            }
        }
        
        // start of the height
        let heightTotal = 0;
        try {
            heightTotal = parseFloat(plant.height, 10);
        } catch {
            //console.log("Not a valid numMait!");
        }

        //start of the maitainence
        let maitTotal = 0;
        try {
            maitTotal = parseInt(plant.maitenance, 10)+1;
            if (maitTotal.isNaN()) mainTotal = 1;
        } catch {
            //console.log("Not a valid numMait!");
            maitTotal = 1;
        }
        // end of maitenance

        total += lightTotal*.6 + seasonTotal*.3 + heightTotal*.2 + maitTotal*.3;
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

    render() {
        return (
            <View>
                <View>
                <RNPickerSelect
                    style = {{height: 50, width: 100}}

                    onValueChange = {(value) => { 
                    this.setState({
                        light: value,
                    })
                }
                }
                items = {[
                    {label: 'Sun', value: 1},
                    {label: "Partial Sun", value: 2},
                    {label: 'Filtered Sunlight', value: 3},
                    {label: "Shade", value: 4},
                    {label: "Morning Sun", value: 5}
                ]
            }
                />
                 <RNPickerSelect
                    style = {{height: 50, width: 100}}

                    onValueChange = {(value) => { 
                    this.setState({
                        season: value,
                    })
                }
                }
                items = {[
                    {label: 'Winter', value: 1},
                    {label: "Spring", value: 2},
                    {label: 'Summer', value: 3},
                    {label: "Fall", value: 4},
                ]
                
            }
                />
                <RNPickerSelect
                    style = {{height: 50, width: 100}}

                    onValueChange = {(value) => { 
                    this.setState({
                        maitenence: value,
                    })
                }
                }
                items = {[
                    {label: 'Low', value: 1},
                    {label: "Medium", value: 2},
                    {label: 'High', value: 3},
                ]
                
            }
                />
                <RNPickerSelect
                    style = {{height: 50, width: 100}}

                    onValueChange = {(value) => { 
                    this.setState({
                        height: value,
                    })
                }
                }
                items = {[
                    {label: "< 1 foot", value: 1},
                    {label: "1 - 2 feet", value: 2},
                    {label: "2 - 5 feet", value: 3},
                    {label: "5 - 10 feet", value: 4},
                    {label: "> 10 feet", value: 5},
                ]
                
            }
                />

                    <Button
                        title="Press me"
                        color="#f194ff"
                        onPress={() => {
                            let myList = generateRecs(this.state.light, this.state.height, this.state.maitenence, this.state.season)
                            console.log(myList);
                            this.setState({
                                plantList: myList,
                            });
                        }}
                    />
                </View>
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

                {/* <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    // onItemSelect={item => alert(JSON.stringify(item))}
                    onItemSelect = {item => recommendPlant(JSON.stringify(item))} 


                    containerStyle={{ padding: 50, }}
                    textInputStyle={styles.inputText}
                    itemStyle={styles.item}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 250 }}
                    items={plants}
                    placeholder="Search"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                /> */}
            </View>
            
        )
    //     return (
    //         <View style={styles.container}>
    //             const {data, value} = this.state;
    //   <div>
    //                 <input type="text" value={value} onChange={this.handleChange} />
    //                 <SearchResults
    //                     value={value}
    //                     data={data}
    //                     renderResults={results => (
    //                         <div>
    //                             {results.map(el => (
    //                                 <div>
    //                                     <span>{el.name}</span>
    //                                     <span>{el.email}</span>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     )}
    //                 />
    //             </div>
    //             );
    //           }
    //         </View>
    //     );
    }

}

// Style sheet for this screen.

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
     comName: {
        fontSize: 22,
     },
     sciName: {
        fontSize: 12,
     }
})