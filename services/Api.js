import Constants from 'expo-constants';

/* istanbul ignore next */
var userID  = "";

export const getUserID = () => {
  return userID;
}

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
    const json = await res.json();
    /* istanbul ignore next */
    userID = json && json.localId || "";
    /* istanbul ignore next */
    email = userName;
    /* istanbul ignore next */
    return json;
  } catch (err) {
    return null;
  }
}

export const signUp = async (userName: string, password: string): Promise<Object> => {
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
    addUserToRealtimeDB(userID);
    //API Call to Add User to Realtime DB
    return json;
  } catch (err) {
    return null;
  }
}

export const addUserToRealtimeDB = async (): Promise<Object> => {
  var plants = {
    baptisiaAustralis: true,
    begonia: true,
    ilexOpaca: true,
  }
  const plantsJson = JSON.stringify(plants);

  var data = {
    myGarden: plantsJson,
  }
  const jsonData = JSON.stringify(data);
  let request = {
    method: "PUT",
    body: jsonData,
    'Content-Type': 'application/json'
  }
  var userToken = getUserID();
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/users/' + [userToken] + '.json', request);
    const json = await res.json();
    return json;
  } catch (err) {
    return null;
  }
}

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



export const fetchPlantDB = async (): Promise<Object> => {
  try {
    /* istanbul ignore next */
    const res = await fetch('https://greenthumb-de7fb.firebaseio.com/.json');
    const json = await res.json();
    return json;
  } catch (err) {
    return null;
  }
}

// newest method to fetch the user's plant data
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
