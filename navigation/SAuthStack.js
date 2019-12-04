import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import SWelcomeScreen from '../screens/SWelcomeScreen.js';
import SLoginScreen from '../screens/SLoginScreen.js';
import SSignUpScreen from '../screens/SSignUpScreen.js';
import SForgotPasswordScreen from '../screens/SForgotPasswordScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
  header: null,
});

const SAuthStack = createStackNavigator(
  {
    Settings: SWelcomeScreen,
    Login: SLoginScreen,
    SignUp: SSignUpScreen,
    ForgotPassword: SForgotPasswordScreen,
  },
  config
);

export default SAuthStack;
