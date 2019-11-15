import Constants from 'expo-constants';

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
