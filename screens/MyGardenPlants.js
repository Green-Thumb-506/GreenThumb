import { StyleSheet, Text, View, ScrollView } from 'react-native';

import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class MyGardenPlants extends React.Component {

   state = {
      plants: [
         { 'comName': 'Orchid', 'sciName': 'Orchidaceae', 'id': 1 },
         { 'comName': 'Rose', 'sciName': 'Rosa', 'id': 2 },
         { 'comName': 'Lily', 'sciName': 'Lilium', 'id': 3 },
         { 'comName': 'Tulip', 'sciName': 'Tulipa', 'id': 4 },
         { 'comName': 'Carnation', 'sciName': 'Dianthus caryophyllus', 'id': 5 },
         { 'comName': 'Lotus', 'sciName': 'Nelumbo nucifera', 'id': 6 },
         { 'comName': 'Trout Lily', 'sciName': 'Erythronium americanum', 'id': 7 },
         { 'comName': 'Common Blue Violet', 'sciName': 'Viola sororia', 'id': 8 },
         { 'comName': 'Sunflower', 'sciName': 'Orchidaceae', 'id': 9 },
         { 'comName': 'Daffodil', 'sciName': 'Rosa', 'id': 10 },
         { 'comName': 'Irises', 'sciName': 'Lilium', 'id': 11 }
      ]

   }



   render() {

      return (

         <View >
            <ScrollView>
               {
                  this.state.plants.map((item, index) => (

                     <View key={item.id} style={styles.item}>

                        <Text style={{ fontSize: 20 }}>{item.id}</Text>
                        <Text style={styles.comName}>{item.comName} <Text style={styles.sciName}>({item.sciName})</Text></Text>
                        
                        <TouchableOpacity>
                           <Icon size={25} name={'ios-trash'} />
                        </TouchableOpacity>

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
      //fontFamily: 'Times New Roman'
   },
   sciName: {
      fontSize: 12,
   }
})
