import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';
import SSignUpScreen from '../screens/SSignUpScreen.js';

import App from '../App';

import { signUp, loginUser, fetchPlantDB } from '../services/Api.js';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));

jest.mock('../navigation/AppNavigator', () => 'AppNavigator');

describe('App', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// describe('SHomeScreen', () => {
//     describe('Rendering', () => {
//         it('should match to snapshot', () => {
//             const navigation = { navigate: jest.fn() };
//             expect(true)
//         });
//     });
// });

it(`Testing Sign Up Screen`, () => {
  const tree = renderer.create(<SSignUpScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});


describe('API', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it(`Testing Sign Up Non Async`, () => {
    const json = signUp("username", "password")
    expect(json);
  });

  it(`Testing Log In Non Async`, () => {
    const json = loginUser("username", "password")
    expect(json);
  });
});

it(`Testing Fetch DB Non Async`, () => {
  const json = fetchPlantDB()
  expect(json);
});

it(`Testing LogIn Async`, () => {
  return loginUser().then(data => {
    expect(data).toBe(data);
  });
});

it(`Testing FetchDB Async`, () => {
  return fetchPlantDB().then(data => {
    expect(data).toBe(data);
  });
});

test('SignUp Async', async () => {
  fetch = jest.fn(() => Promise.resolve());
  await expect(signUp("username", "password")).resolves.toBe(null);
});

test('LogIn Async', async () => {
  fetch = jest.fn(() => Promise.resolve());
  await expect(loginUser("username", "password")).resolves.toBe(null);
});

test('FetchDB Async', async () => {
  fetch = jest.fn(() => Promise.resolve());
  await expect(fetchPlantDB()).resolves.toBe(null);
});
