"use strict";

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
};

type State = {
};

class SWelcomeScreen extends React.PureComponent<Props, State> {
  state: State = {
  };

  static navigationOptions = { header: null };


  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render(): React$Element<any> {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>GreenThumb</Text>
        <Image
          style={styles.image}
          source={require('../images/green-tea.png')}
        />

        <Button
          title="Create an Account"
          style={styles.button}
          buttonStyle={{
            backgroundColor:'#2c3e50',
          }}
          onPress={this._proceedCreate}
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

  _proceedCreate = () => {
    this.props.navigation.navigate('SignUp');
  }

  _proceedLogin = () => {
    this.props.navigation.navigate('Login');
  }

  _proceedUnregistered = () => {
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
  headerText: {
    marginBottom: 60,
    fontWeight: '600',
    fontSize: 50,
    color: '#2c3e50',
  },
  button: {
    width: '60%',
    color:  '#2c3e50',
    paddingBottom: 10,
  },
});

module.exports = SWelcomeScreen;
