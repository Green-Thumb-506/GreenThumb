import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

import SSignUpScreen from '../screens/SSignUpScreen.js';
import SLoginScreen from '../screens/SLoginScreen.js';
import SWelcomeScreen from '../screens/SWelcomeScreen.js';
import SSettingsScreen from '../screens/SSettingsScreen.js';
import SHomeScreen from '../screens/SHomeScreen.js';

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

  test('Sanity check', () => {
    expect(true).toBe(true);
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


it(`Testing Sign Up Screen`, () => {
  const tree = renderer.create(<SSignUpScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Testing Login Screen`, () => {
  const tree = renderer.create(<SLoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Testing Welcome Screen`, () => {
  const tree = renderer.create(<SWelcomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Testing SHomeScreen Screen`, () => {
  const tree = renderer.create(<SHomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});


it(`Testing Settings Screen`, () => {
  const tree = renderer.create(<SSettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Testing Settings Screen`, () => {
  const tree = renderer.create(<SSettingsScreen />).toJSON();
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

  test('Sanity check', () => {
    expect(true).toBe(true);
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
