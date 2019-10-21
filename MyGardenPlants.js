import {StyleSheet,Text, View, ScrollView} from 'react-native';
import React from 'react';  
  


 

 export default class MyGardenPlants extends React.Component {

              state = {

                             plants: [

                                           {'comName': 'Orchid', 'sciName':'Orchidaceae', 'id': 1},

                                           {'comName': 'Rose', 'sciName':'Rosa', 'id': 2},

                                           {'comName': 'Lily','sciName':'Lilium', 'id': 3},

                                           {'comName': 'Tulip','sciName':'Tulipa', 'id': 4},

                                           {'comName': 'Carnation','sciName':'Dianthus caryophyllus', 'id': 5},

                                           {'comName': 'Lotus','sciName':'Nelumbo nucifera', 'id': 6},

                                           {'comName': 'Trout Lily','sciName':'Erythronium americanum', 'id': 7},

                                           {'comName': 'Common Blue Violet','sciName':'Viola sororia', 'id': 8},
                                           {'comName': 'SunFlower', 'sciName':'Orchidaceae', 'id': 9},

                                           {'comName': 'Daffodil', 'sciName':'Rosa', 'id': 10},

                                           {'comName': 'Irises','sciName':'Lilium', 'id': 11} 

                             ]

              }

 

render () {

  return (

         <View>

            <ScrollView>

               {

                  this.state.plants.map((item, index) => (

                     <View key = {item.id} style = {styles.item}>

                        <Text>{item.comName}</Text>

                     </View>

                  ))

               }

            </ScrollView>

         </View>

 

         );

    }

}

 const styles = StyleSheet.create({

                 item: {

      flexDirection: 'row',

      justifyContent: 'space-between',

      alignItems: 'center',

      padding: 30,

      margin: 2,

      borderColor: '#2a4944',

      borderWidth: 1,

      backgroundColor: '#d2f7f1'

   }

})
