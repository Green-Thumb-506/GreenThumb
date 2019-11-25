import Constants from 'expo-constants';

export const recommendationsArray = (snapshot) => {
  var recArray = [];

  snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      recArray.push(item);
  });

  return recArray;
}

// 
// import {recommendationsArray} from 'RecommendationsAlgorithm.js';
//
//
// recommendationsArray(snapshot)
