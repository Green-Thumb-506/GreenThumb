import Constants from 'expo-constants';

var installationId = Constants.installationId;
var installationIdHouse = Constants.installationId + "house";

var email = "";
var name = "";
var realtimeDBname = "";

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
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7JOQOxyW82ZPpDYDjaJNwR7MyoxfibM8', request);
    const json = await res.json();
    email = userName;
    return json;
  } catch (err) {
    // console.error("#25 Login error: ", err);
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
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7JOQOxyW82ZPpDYDjaJNwR7MyoxfibM8', request);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("#25 Sign Up error: ", JSON.stringify(err));
    return null;
  }
}

export const getHouses = async (): Promise<Object> => {
  try {
    const res = await fetch('https://spike-exercise-f7fec.firebaseio.com/.json');
    const json = await res.json();
    console.log("JSON: " + JSON.stringify(json))
    return json;
  } catch (err) {
    console.error("#25 Sign Up error: ", err);
    return null;
  }
}


export const storeUser = async (userName: string, userEmail: string) => {
  email = userEmail;
  name = userName;

  var data = {
    email: userEmail,
    name: userName,
  };
  const jsonData = JSON.stringify(data);
  console.log(jsonData)
  let request = {
      method: 'PUT',
      body: jsonData,
      'Content-Type': 'application/json'
  }
  try {
    const res = await fetch('https://spike-exercise-f7fec.firebaseio.com/' + [installationId] + '.json', request);
    const json = await res.json();
    console.log("JSON: " + JSON.stringify(json))
    realtimeDBname = json && json.name;
    return json;
  } catch (err) {
    console.error("#28 Sign Up error: ", err);
    return null;
  }
}

export const getUserName = async (): String => {
  try {
    const res = await fetch('https://spike-exercise-f7fec.firebaseio.com/.json');
    const json = await res.json();
    return json && json[installationId] && json[installationId].name || "";
  } catch (err) {
    return "Name: " + name;
  }
}

export const getNumRoommates = async (): number => {
  try {
    const res = await fetch('https://spike-exercise-f7fec.firebaseio.com/.json');
    const json = await res.json();
    return json && json[installationIdHouse] && json[installationIdHouse].numRoommates || 0;
  } catch (err) {
    // console.error("#28 Sign Up error: ", err);
    return 0;
  }
}

export const getPrice = async (): number => {
  try {
    const res = await fetch('https://spike-exercise-f7fec.firebaseio.com/.json');
    const json = await res.json();
    return json && json[installationIdHouse] && json[installationIdHouse].price || 0;
  } catch (err) {
    return 0;
  }
}

export const addListing = async (price: string, numRoommates: string, name: string, email: string) => {
  var data = {
    price: price,
    numRoommates: numRoommates,
    name: name,
    email: email,
  };
  const jsonData = JSON.stringify(data);
  let request = {
      method: 'PUT',
      body: jsonData,
      'Content-Type': 'application/json'
  }

  try {
    const res = await fetch('https://spike-exercise-f7fec.firebaseio.com/' + [installationIdHouse] + '.json', request);
    const json = await res.json();
    console.log("JSON: " + JSON.stringify(json))
    return json;
  } catch (err) {
    return null;
  }
}

export const addFavorite = async (key: string) => {
  var data = {
    favorite: true,
  };
  const jsonData = JSON.stringify(data);
  let request = {
      method: 'PATCH',
      body: jsonData,
      'Content-Type': 'application/json'
  }
  try {
    const res = await fetch('https://spike-exercise-f7fec.firebaseio.com/' + key + '/favorites/' +  [installationId] + '.json', request);
    const json = await res.json();
    console.log("JSON: " + JSON.stringify(json))
    return json;
  } catch (err) {
    return null;
  }
}

export const getUserEmail = (): String => {
  return email;
}

export const isLoggedIn = (): boolean => {
  if (email) {
    return true;
  }
  return false
}
