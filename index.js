
const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');

// Load values from the .env file in this directory into process.env.
dotenv.config();

// Configures Firebase.
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const database = firebase.database();

// Configures Algolia.
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

// Starter code provided by Algolia tutorial; useless without DB access.
/* Adding a few contacts
Promise.all([
    database.ref('/contacts').push({
      name: 'Josh',
      city: 'San Francisco'
    }),
    database.ref('/contacts').push({
      name: 'Tim',
      city: 'Paris'
    })]).then(() => {
      console.log("Contacts added to Firebase");
      process.exit(0);
    }).catch(error => {
      console.error("Error adding contacts to Firebase", error);
      process.exit(1);
    });
    */

    // Get all plants from Firebase.
database.ref('/plantDictionary').once('value', plantDictionary => {
  // Build an array of all records to push to Algolia.
  const records = [];
  plantDictionary.forEach(plant => {
    // Get the key and data from the snapshot.
    const childKey = plant.key;
    const childData = plant.val();
    // We set the Algolia objectID as the Firebase .key
    childData.objectID = childKey;
    // Add object for indexing.
    records.push(childData);
  });

  // Add or update new objects.
  index
    .saveObjects(records)
    .then(() => {
      console.log('Plants imported into Algolia.');
    })
    .catch(error => {
      console.error('Error when importing plant into Algolia', error);
      process.exit(1);
    });
});

  