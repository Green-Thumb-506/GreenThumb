
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
  