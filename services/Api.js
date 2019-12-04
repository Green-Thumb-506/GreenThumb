import Constants from 'expo-constants';

/* istanbul ignore next */
var userID  = "";
var UserIDToken  = "";

/* istanbul ignore next */
export const getUserID = () => {
  return userID;
}

export const getUserIDToken = () => {
  return UserIDToken;
}

/* istanbul ignore next */
export const loginUser = async (userName: string, password: string): Promise<Object> => {
  var data = {
    email: userName,
    password: password,
    returnSecureToken: true
  };
  const jsonData = JSON.stringify(data);
  let request = {
      method: 'POST',
      body: jsonData,
      'Content-Type': 'application/json'
  }
  try {
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyA2M79qFAmhUV7VGogKeKSRNI2BdjsHs', request);
    /* istanbul ignore next */
    const json = await res.json();
    /* istanbul ignore next */
    userID = json && json.localId || "";
    UserIDToken = json && json.idToken || "";
    /* istanbul ignore next */
    email = userName;
    /* istanbul ignore next */
    return json;
  } catch (err) {
    return null;
  }
}

export const signUp = async (name: string, userName: string, password: string): Promise<Object> => {
  var data = {
    email: userName,
    password: password,
    returnSecureToken: true
  };
  const jsonData = JSON.stringify(data);
  let request = {
      method: 'POST',
      body: jsonData,
      'Content-Type': 'application/json'
  }
  try {
    /* istanbul ignore next */
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyA2M79qFAmhUV7VGogKeKSRNI2BdjsHs', request);
    const json = await res.json();
    /* istanbul ignore next */
    userID = json && json.localId || "";
    UserIDToken = json && json.idToken || "";
    /* istanbul ignore next */
    addUserToRealtimeDB(name, userName);
    //API Call to Add User to Realtime DB
    return json;
  } catch (err) {
    return null;
  }
}

/* istanbul ignore next */
export const addUserToRealtimeDB = async (name: string, email: string): Promise<Object> => {
  var userToken = getUserID();
  if (!userToken) { return; }

  var plants = {}
  const plantsJson = JSON.stringify(plants);
  var data = {
    email: email,
    name: name,
    myGarden: plantsJson,
  }
  const jsonData = JSON.stringify(data);
  let request = {
    method: "PUT",
    body: jsonData,
    'Content-Type': 'application/json'
  }
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/users/' + [userToken] + '.json', request);
    const json = await res.json();
    return json;
  } catch (err) {
    return null;
  }
}

/* istanbul ignore next */
export const removePlantUserDB = async (name: string): Promise<Object> => {
  var data = {
    [name]: false,
  }
  const jsonData = JSON.stringify(data);
  let request = {
    method: "PATCH",
    body: jsonData,
    'Content-Type': 'application/json'
  }
  var userToken = getUserID();
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/users/' + [userToken] + '/myGarden/' + '.json', request);
    const json = await res.json();
    return json;
  } catch (err) {
    return null;
  }
}

/* istanbul ignore next */
export const addPlantUserDB = async (name: string): Promise<Object> => {
  var data = {
    [name]: true,
  }
  const jsonData = JSON.stringify(data);
  let request = {
    method: "PATCH",
    body: jsonData,
    'Content-Type': 'application/json'
  }
  var userToken = getUserID();
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/users/' + [userToken] + '/myGarden/' + '.json', request);
    const json = await res.json();
    return json;
  } catch (err) {
    return null;
  }
}

/* istanbul ignore next */
export const fetchPlantDB = async (): Promise<Object> => {
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/.json');
    /* istanbul ignore next */
    const json = await res.json();
    /* istanbul ignore next */
    return json;
  } catch (err) {
    return null;
  }
}

/* istanbul ignore next */
export const fetchUserPlants = async (): Promise<Object> => {
  try {
    /* istanbul ignore next */
    let myID = getUserID();
    const res = await fetch(`https://greenthumb-de7fb.firebaseio.com/users/${myID}/.json`);
    const json = await res.json();
    return json && json.myGarden || null;
  } catch (err) {
    return null;
  }
}





/**
 * Here is the code that could be wonky below!!
 * 
 */
// Have the users be able to update their settings!

export const updateUserEmail = async (email): Promise<Object> => {
  var data = {
    email: email,
  }
  //console.warn("This will be the updated email addres: " + email);
  const jsonData = JSON.stringify(data);
  let request = {
    method: "PATCH",
    body: jsonData,
    'Content-Type': 'application/json'
  }
  var userToken = getUserID();
  //console.warn("user token" + userToken);
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/users/' + [userToken] + '.json', request);
    const json = await res.json();
    //console.warn("res" + JSON.stringify(json))
    return json;
  } catch (err) {
    return null;
  }
}

// This will ensure that the actual credentials are changed!!!
export const changeEmailAuth = async (email: string): Promise<Object> => {
  
  let myID = getUserIDToken();
  //console.warn("This is the ID Token for the user looking to change email: " + myID);
  var data = {
    idToken: myID,
    email: email,
    returnSecureToken: true
  };
  const jsonData = JSON.stringify(data);
  let request = {
      method: 'POST',
      body: jsonData,
      'Content-Type': 'application/json'
  }
  try {
    /* istanbul ignore next */
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAyA2M79qFAmhUV7VGogKeKSRNI2BdjsHs', request);
    const json = await res.json();
    /* istanbul ignore next */
    //userID = json && json.localId || "";
    //console.warn("JSON request of the change email!: " + json);
    updateUserEmail(email);
    //API Call to Add User to Realtime DB

    return json;
  } catch (err) {
    return null;
  }
}


/**
 * Starting the password update section!!!!
 * @param {} email 
 */
// Here is the code to update the user's password!! 
// Have the users be able to update their settings!


// This will ensure that the actual credentials are changed!!!
export const changePasswordAuth = async (password: string): Promise<Object> => {
  
  let myID = getUserIDToken();
  //console.warn("This is the ID Token for the user looking to change email: " + myID);
  var data = {
    idToken: myID,
    password: password,
    returnSecureToken: true
  };
  const jsonData = JSON.stringify(data);
  let request = {
      method: 'POST',
      body: jsonData,
      'Content-Type': 'application/json'
  }
  try {
    /* istanbul ignore next */
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAyA2M79qFAmhUV7VGogKeKSRNI2BdjsHs', request);
    const json = await res.json();
    /* istanbul ignore next */
    //userID = json && json.localId || "";
    //console.warn("JSON request for the change in password!!!: " + json);
    //updateUserEmail(email);
    //API Call to Add User to Realtime DB

    return json;
  } catch (err) {
    return null;
  }
}

/**
 * THis is the code to delete the user's account!!
 * @param {*} email 
 */
export const deleteUserAccount = async (email: string): Promise<Object> => {
  
  let myID = getUserIDToken();
  //let uid = getUserID();
  //console.warn("This is the ID Token for the user looking to change email: " + myID);
  var data = {
    idToken: myID,
  };
  const jsonData = JSON.stringify(data);
  let request = {
      method: 'POST',
      body: jsonData,
      'Content-Type': 'application/json'
  }
  try {
    /* istanbul ignore next */
    deleteUserAccountDB();
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAyA2M79qFAmhUV7VGogKeKSRNI2BdjsHs', request);
    const json = await res.json();
    /* istanbul ignore next */
    //userID = json && json.localId || "";
    //console.warn("JSON request: " + json);
    
    //API Call to Add User to Realtime DB

    return json;
  } catch (err) {
    return null;
  }
}

export const deleteUserAccountDB = async (): Promise<Object> => {
  
  //console.warn("This will be the deleted DB entry: " + uid);
  //const jsonData = JSON.stringify(data);
  let request = {
    method: "DELETE",
    'Content-Type': 'application/json'
  }
  var userToken = getUserID();
  //console.warn("user token that will be deleted!" + userToken);
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/users/' + [userToken] + '.json', request);
    const json = await res.json();
    //console.warn("res: " + JSON.stringify(json))
    return json;
  } catch (err) {
    return null;
  }
}

export const fetchUserInfo = async (): Promise<Object> => {
  try {
    /* istanbul ignore next */
    let myID = getUserID();
    const res = await fetch(`https://greenthumb-de7fb.firebaseio.com/users/${myID}/.json`);
    const json = await res.json();
    console.warn("JSON: ", JSON.stringify(json));
    return json;
  } catch (err) {
    return null;
  }
}