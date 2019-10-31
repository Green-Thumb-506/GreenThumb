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
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyA2M79qFAmhUV7VGogKeKSRNI2BdjsHs', request);
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
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyA2M79qFAmhUV7VGogKeKSRNI2BdjsHs', request);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("#25 Sign Up error: ", JSON.stringify(err));
    return null;
  }
}