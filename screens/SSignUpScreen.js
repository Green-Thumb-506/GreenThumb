"use strict";

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { signUp, storeUser } from '../services/Api.js';

/* istanbul ignore next */
type State = {
  email: string,
  password: string,
  name: string,
};

class SSignUpScreen extends React.PureComponent<Props, State> {

  /* istanbul ignore next */
  state: State = {
    email: '',
    password: '',
    name: '',
  };

  /* istanbul ignore next */
  static navigationOptions = {
    title: 'Create an Account',
    headerStyle: { backgroundColor: '#bdc3c7' },
    headerTitleStyle: { color: '#2c3e50', },
  }

  /* istanbul ignore next */
  render(): React$Element<any> {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={require('../images/green-tea.png')}
        />
        <Input
          placeholder='John Deer'
          containerStyle={styles.inputEmail}
          label="Name"
          onChangeText={text => {
            /* istanbul ignore next */
            this._onChangeName(text)
          }}
        />
        <Input
          placeholder='email@address.com'
          containerStyle={styles.inputEmail}
          label="Email"
          onChangeText={text => {
            /* istanbul ignore next */
            this._onChangeEmail(text)
          }}
        />
        <Input
          placeholder='Password'
          containerStyle={styles.input}
          secureTextEntry={true}
          label="Password"
          onChangeText={text => {
            /* istanbul ignore next */
            this._onChangePassword(text)
          }}
        />
        <Button
          title="Create Account"
          style={styles.button}
          buttonStyle={{
            backgroundColor:'#2c3e50',
          }}
          onPress={this._proceedLogin}
        />
      </ScrollView>
    );
  }

  /* istanbul ignore next */
  _onChangeName = (text: string) => {
    this.setState({
      name: text,
    });
  }

  /* istanbul ignore next */
  _onChangeEmail = (text: string) => {
    this.setState({
      email: text,
    });
  }

  /* istanbul ignore next */
  _onChangePassword = (text: string) => {
    this.setState({
      password: text,
    });
  }

  /* istanbul ignore next */
  _proceedLogin = async () => {
    if (!this.state.email || !this.state.password || !this.state.name) {
      Alert.alert(
        'Error!',
        'Please enter your Name, Email, and Password!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      return;
    }

    var res = await signUp(this.state.email, this.state.password);
    if (!res || res.error) {
      Alert.alert(
        'Error!',
        res && res.error && res.error.message || 'There was an error signing up!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      return;
    }
    this.props.navigation.navigate('Main');
  }
}

/* istanbul ignore next */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 60,
  },
  inputStyle: {
    paddingBottom: 100,
  },
  headerText: {
    marginBottom: 30,
    fontWeight: '500',
    fontSize: 20,
    color: '#2c3e50',
  },
  button: {
    width: '70%',
    color:  '#2c3e50',
    paddingBottom: 30,
  },
  input: {
    width: '70%',
    paddingBottom: 20,
  },
  inputEmail: {
    width: '70%',
    paddingBottom: 10,
  },
});

module.exports = SSignUpScreen;
