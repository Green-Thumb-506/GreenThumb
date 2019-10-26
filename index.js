const functions = require('firebase-functions');
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

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables.
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'Plants';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
// End initialization of Algolia.

// [START update_index_function].
// Update the search index every time a plant is created.
exports.onNoteCreated = functions.firestore.document('Plants/{plantId}').onCreate((snap, context) => {
  // Get the plant document.
  const plant = snap.data();

  // Add an 'objectID' field which Algolia requires.
  plant.objectID = context.params.noteId;

  // Write to the Algolia index.
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(plant);
});
// [END update_index_function].

// [START get_firebase_user].
const admin = require('firebase-admin');
admin.initializeApp();

async function getFirebaseUser(req, res, next) {
  console.log('Check if request is authorized with Firebase ID token');

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>'
      );
    return res.sendStatus(403);
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found \'Authorization\' header');
    idToken = req.headers.authorization.split('Bearer ')[1];
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    return next();
  } catch(error) {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(403).send('Unauthorized');
  }
}
// [END get_firebase_user].

// [START get_algolia_user_token]
// This complex HTTP function will be created as an ExpressJS app:
// https://expressjs.com/en/4x/api.html
const app = require('express')();

// We'll enable CORS support to allow the function to be invoked
// from our app client-side.
app.use(require('cors')({origin: true}));

// Then we'll also use a special 'getFirebaseUser' middleware which
// verifies the Authorization header and adds a `user` field to the
// incoming request:
// https://gist.github.com/abehaskins/832d6f8665454d0cd99ef08c229afb42
app.use(getFirebaseUser);

// Add a route handler to the app to generate the secured key.
app.get('/', (req, res) => {
  // Create the params object as described in the Algolia documentation:
  // https://www.algolia.com/doc/guides/security/api-keys/#generating-api-keys
  const params = {
    // This filter ensures that only documents where author == user_id will be readable.
    filters: `author:${req.user.user_id}`,
    // We also proxy the user_id as a unique token for this key.
    userToken: req.user.user_id,
  };

  // Call the Algolia API to generate a unique key based on our search key.
  const key = client.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params);

  // Then return this key as {key: '...key'}.
  res.json({key});
});

// Finally, pass our ExpressJS app to Cloud Functions as a function
// called 'getSearchKey';
exports.getSearchKey = functions.https.onRequest(app);
// [END get_algolia_user_token].

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PROJECT_ID = '';          // Required - your Firebase project ID
var ALGOLIA_APP_ID = '17YYHSNIFA';     // Required - your Algolia app ID
var ALGOLIA_SEARCH_KEY = ''; // Optional - Only used for unauthenticated search

function unauthenticated_search(query) {

  // [START search_index_unsecure]
  var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
  var index = client.initIndex('notes');

  // Perform an Algolia search:
  // https://www.algolia.com/doc/api-reference/api-methods/search/
  index
    .search({
      query
    })
    .then(function(responses) {
      // Response from Algolia:
      // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
      console.log(responses.hits);
    });
  // [END search_index_unsecure]
}

function authenticated_search(query) {
  var client;
  var index;
  // [START search_index_secure]
  // Use Firebase Authentication to request the underlying token
  return firebase.auth().currentUser.getIdToken()
    .then(function(token) {
      // The token is then passed to our getSearchKey Cloud Function
      return fetch('https://us-central1-' + PROJECT_ID + '.cloudfunctions.net/getSearchKey/', {
          headers: { Authorization: 'Bearer ' + token }
      });
    })
    .then(function(response) {
      // The Fetch API returns a stream, which we convert into a JSON object.
      return response.json();
    })
    .then(function(data) {
      // Data will contain the restricted key in the `key` field.
      client = algoliasearch(ALGOLIA_APP_ID, data.key);
      index = client.initIndex('notes');

      // Perform the search as usual.
      return index.search({query});
    })
    .then(function(responses) {
      // Finally, use the search 'hits' returned from Algolia.
      return responses.hits;
    });
  // [END search_index_secure]
}

function search(query) {
  if (!PROJECT_ID) {
    console.warn('Please set PROJECT_ID in /index.js!');
  } else if (!ALGOLIA_APP_ID) {
    console.warn('Please set ALGOLIA_APP_ID in /index.js!');
  } else if (ALGOLIA_SEARCH_KEY) {
    console.log('Performing unauthenticated search...');
    return unauthenticated_search(query);
  } else {
    return firebase.auth().signInAnonymously()
      .then(function() {
        return authenticated_search(query).catch(function(err) {
          console.warn(err);
        });
      }).catch(function(err) {
        console.warn(err);
        console.warn('Please enable Anonymous Authentication in your Firebase Project!');
      });
  }
}

// Other code to wire up the buttons and textboxes.

document.querySelector('#do-add-note').addEventListener('click', function() {
  firebase.firestore().collection('notes').add({
    author: [firebase.auth().currentUser.uid],
    text: document.querySelector('#note-text').value
  }).then(function() {
    document.querySelector('#note-text').value = '';
  });
});

document.querySelector('#do-query').addEventListener('click', function() {
  search(document.querySelector('#query-text').value).then(function(hits) {
    document.querySelector('#results').innerHTML = JSON.stringify(hits, null, 2);
  });
});
  