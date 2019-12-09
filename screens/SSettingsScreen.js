
"use strict";

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { changeEmailAuth, changePasswordAuth, deleteUserAccount, fetchUserInfo } from '../services/Api.js';

//class SLoginScreen extends React.PureComponent<Props, State>
type State = {
  email: string,
  password: string,
  username: string,
  useremail: string,
};

export default class SSettingsScreen extends React.PureComponent<Props, State> {

  state: State = {
    email: '',
    password: '',
    username: '',
    useremail: '',
  };


  componentDidMount() {
    this._fetchUserInfo();
  }

  static navigationOptions = {
    title: 'Settings',
    headerStyle: { backgroundColor: '#3BAD87' },
    headerTitleStyle: { fontSize: 40, height: 60 },
  }




  render(): React$Element<any> {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >

          <View style={styles.userAccoutView}>
            <Text>Name: </Text><Text style={styles.userNameText}>{this.state.username}</Text>
            <Text>Email: </Text><Text style={styles.userNameText}>{this.state.useremail}</Text>
            <Button
              title="Logout of Account"
              style={styles.button}
              buttonStyle={{
                backgroundColor: '#2c3e50',
              }}
              onPress={this._logoutUser}
            />
          </View>

            <Input
              placeholder='Enter email address'
              containerStyle={styles.inputEmail}
              label="Email"
              onChangeText={text => {
                /* istanbul ignore next */
                this._newEmail(text);
              }}
            />
            <Button
              title="Update Email"
              style={styles.button}
              buttonStyle={{
                backgroundColor: '#2c3e50',
              }}
              onPress={this._changeUserEmail}
            />
            <Input
              placeholder='Enter password'
              containerStyle={styles.inputEmail}
              label="Password"
              onChangeText={text => {
                /* istanbul ignore next */
                this._newPassword(text);
              }}
            />
            <Button
              title="Update Password"
              style={styles.button}
              buttonStyle={{
                backgroundColor: '#2c3e50',
              }}
              onPress={this._changeUserPassword}
            />

          <View style={styles.deleteView}>
            <Button
              title="DELETE ACCOUNT!"
              style={styles.button}
              buttonStyle={{
                backgroundColor: '#EE0000',
              }}
              onPress={this._deleteUserAccount}
            />
          </View>
        </ScrollView>
      </View>
    );
  }


  _fetchUserInfo = async (): void => {
    var res = await fetchUserInfo();
    this.setState({
      username: res && res.name || '',
      useremail: res && res.email || '',
    })
  }

  _newEmail = (text: string) => {
    this.setState({
      email: text,
    });
  }
  _newPassword = (text: string) => {
    this.setState({
      password: text,
    });
  }

  _logoutUser = async () => {
    if (this.props.navigation) {
      this.props.navigation.navigate('Auth');
    }
  }

  _deleteUserAccount = async () => {

    const res = await deleteUserAccount(this.state.email);
    //console.warn("this is the returned res, it should be null: " + res);

    if (res.error) {
      //console.warn("I am entering the error message portion!!!")
      Alert.alert(
        'Error!',
        res && res.error && res.error.message || 'There was an error changing your email!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      return;
    }

    Alert.alert("Successfully Deleted User Account");

    this._logoutUser();
  }


  _changeUserEmail = async () => {
    if (!this.state.email) {
      Alert.alert(
        'Error!',
        'Please enter your Name, Email, and Password!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      return;
    }

    const res = await changeEmailAuth(this.state.email);
    if (!res || res.error) {
      Alert.alert(
        'Error!',
        res && res.error && res.error.message || 'There was an error changing your email!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      this._fetchUserInfo();
      return;
    }
    Alert.alert("Successfully Changed User Email");
    this._logoutUser();
  }

  _changeUserPassword = async () => {
    if (!this.state.password) {
      Alert.alert(
        'Error!',
        'Please enter your Name, Email, and Password!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      return;
    }

    const res = await changePasswordAuth(this.state.password);
    if (!res || res.error) {
      Alert.alert(
        'Error!',
        res && res.error && res.error.message || 'There was an error changing your email!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      return;
    }
    Alert.alert("Successfully Changed User Password");
    this._logoutUser();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 5,
  },
  userAccoutView: {
    borderRadius: 5,
    borderWidth: 3,
    alignItems: 'center',
    padding: 10,
  },
  deleteView: {
    alignItems: 'center',
    padding: 60,
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '75%',
    minHeight: 50,
    maxHeight: 50,
    paddingTop: 10,
    borderRadius: 5,
  },
  userNameText: {
    fontSize: 30,
  }
});
