
"use strict";

import React from 'react';
import { Text, View, StyleSheet, Alert} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { changeEmailAuth, changePasswordAuth, deleteUserAccount } from '../services/Api.js';

//class SLoginScreen extends React.PureComponent<Props, State>
type State = {
  email: string,
  password: string,
};

export default class SSettingsScreen extends React.PureComponent<Props, State> {

    state: State = {
      email: '',
      password: '',
    };
    

    static navigationOptions = {
        title: 'Settings',
        headerStyle: { backgroundColor: '#3BAD87' },
        headerTitleStyle: { fontSize: 40, height: 60 },
    }

   

    render(): React$Element<any> {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='email@address.com'
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
                        backgroundColor:'#2c3e50',
                    }}
                    onPress={this._changeUserEmail}
                />
                <Input
                    placeholder='new password'
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
                        backgroundColor:'#2c3e50',
                    }}
                    onPress={this._changeUserPassword}
                />
                <Button
                    title="DELETE ACCOUNT!"
                    style={styles.button}
                    buttonStyle={{
                        backgroundColor:'#2c3e50',
                    }}
                    onPress={this._deleteUserAccount}
                />
            </View>
        );
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

  _deleteUserAccount = async () => {

    const res = await deleteUserAccount(this.state.email);
    //console.warn("this is the returned res, it should be null: " + res);
    
    if (res.error) {
      //console.warn("I am entering the error message portion!!!")
      Alert.alert(
        'Error!',
        res && res.error && res.error.message || 'There was an error changing your email!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      return;
    }
    //console.warn("This should be navigating to the home screen!!!");
    this.props.navigation.navigate('Settings');
    
  }


    _changeUserEmail = async () => {
        if (!this.state.email) {
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
    
        const res = await changeEmailAuth(this.state.email);
        if (!res || res.error) {
          Alert.alert(
            'Error!',
            res && res.error && res.error.message || 'There was an error changing your email!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          return;
        }
      }

      _changeUserPassword = async () => {
        if (!this.state.password) {
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
    
        const res = await changePasswordAuth(this.state.password);
        if (!res || res.error) {
          Alert.alert(
            'Error!',
            res && res.error && res.error.message || 'There was an error changing your email!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          return;
        }
      }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
});
