import React from 'react';  
import {StyleSheet, Text, View,Button,ScrollView} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; 
import { Header, ListItem } from 'react-native-elements';
import MyGardenPlants from './MyGardenPlants';
import Icon from 'react-native-vector-icons/Ionicons';  




class GardenScreen extends React.Component { 
 render() {  
    return ( 
     <View >

<Text style={{width: 500, height: 50,  fontSize: 40, backgroundColor: '#3BAD87', paddingLeft: 100
    }}>My Garden</Text>

      <MyGardenPlants />
      </View> 
   

    );  
  }  
} 




    
  

class SearchScreen extends React.Component {  
  render() {  
    return (  
        <View style={styles.container}>  
          <Text>Search Screen</Text>  
        </View>  
    );  
  }  
}  
class RecommendationsScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Recommendations Screen</Text>  
            </View>  
        );  
    }  
}  

class LibraryScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Library Screen</Text>  
            </View>  
        );  
    }  
}  
class SettingsScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Settings Screen</Text>  
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

const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Garden: { screen: GardenScreen,  
            navigationOptions:{  
                tabBarLabel:'My Garden',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },  
        Search: { screen: SearchScreen,  
            navigationOptions:{  
                tabBarLabel:'Search',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-search'}/>  
                    </View>),  
                activeColor: '#f60c0d',  
                inactiveColor: '#f65a22',  
                barStyle: { backgroundColor: '#f69b31' },  
            }  
        },  
        Recommendations: { screen: RecommendationsScreen,  
            navigationOptions:{  
                tabBarLabel:'Recommendations',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-leaf'}/>  
                    </View>),  
                activeColor: '#615af6',  
                inactiveColor: '#46f6d7',  
                barStyle: { backgroundColor: '#67baf6' },  
            }  
        }, 

         Library: { screen: LibraryScreen,  
            navigationOptions:{  
                tabBarLabel:'Library',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-list-box'}/>  
                    </View>),  
                activeColor: '#615af6',  
                inactiveColor: '#46f6d7',  
                barStyle: { backgroundColor: '#67baf6' },  
            }  
        },
        Settings: {  
            screen: SettingsScreen,  
            navigationOptions:{  
                tabBarLabel:'Settings',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-settings'}/>  
                    </View>),  
            }  
        },  
    },  
    {  
      initialRouteName: "Garden",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  
  
export default createAppContainer(TabNavigator);  
