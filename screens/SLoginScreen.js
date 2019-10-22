"use strict";

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { loginUser, storeUser } from '../services/Api.js';

type Props = {
};

type State = {
  email: string,
  password: string,
};

class SLoginScreen extends React.PureComponent<Props, State> {
  state: State = {
    email: '',
    password: '',
  };

  static navigationOptions = {
    title: 'Login to Account',
    headerStyle: { backgroundColor: '#bdc3c7' },
    headerTitleStyle: { color: '#2c3e50', },
  }


  render(): React$Element<any> {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../images/green-tea.png')}
        />
        <Input
          placeholder='email@address.com'
          containerStyle={styles.inputEmail}
          label="Email"
          onChangeText={text => this._onChangeEmail(text)}
        />
        <Input
          placeholder='Password'
          containerStyle={styles.input}
          label="Password"
          secureTextEntry={true}
          onChangeText={text => this._onChangePassword(text)}
        />
        <Button
          title="Login to Account"
          style={styles.button}
          buttonStyle={{
            backgroundColor:'#2c3e50',
          }}
          onPress={this._proceedLogin}
        />
      </View>
    );
  }

  _onChangeName = (text: string) => {
    this.setState({
      name: text,
    });
  }

  _onChangeEmail = (text: string) => {
    this.setState({
      email: text,
    });
  }

  _onChangePassword = (text: string) => {
    this.setState({
      password: text,
    });
  }

  _proceedLogin = async () => {
    if (!this.state.email || !this.state.password) {
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

    const res = await loginUser(this.state.email, this.state.password);
    if (!res || res.error) {
      Alert.alert(
        'Error!',
        res && res.error && res.error.message || 'There was an error logging in!',
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
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

module.exports = SLoginScreen;
