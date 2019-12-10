import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import SHomeScreen from '../screens/SHomeScreen.js'
import SSearchScreen from '../screens/SSearchScreen.js'
import SRecommendationsScreen from '../screens/SRecommendationsScreen.js'
import SLibraryScreen from '../screens/SLibraryScreen.js'
import SSettingsScreen from '../screens/SSettingsScreen.js'
import SDetailedPlantScreen from '../screens/SDetailedPlantScreen.js'
import RecommendedPlantsList from '../screens/RecommendedPlantsList.js'

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
    headerBackTitle: 'Back'
});


// My Garden Screen
const GardenStack = createStackNavigator(
    {
        Garden: SHomeScreen,
        DetailedPlant: SDetailedPlantScreen,
    },
    config
);
GardenStack.navigationOptions = {
    tabBarLabel: 'My Garden',
    tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
        </View>),
};


// Search Screen
const SearchStack = createStackNavigator(
    {
        Search: SSearchScreen,
        DetailedPlant: SDetailedPlantScreen,
    },
    config
);
SearchStack.navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-search'} />
        </View>),
};


// Recommendations Screen
const RecommendationsStack = createStackNavigator(
    {
        Recommendations: SRecommendationsScreen,
        DetailedPlant: SDetailedPlantScreen,
        RecommendedPlantsList: RecommendedPlantsList,
    },
    config
);
RecommendationsStack.navigationOptions = {
    tabBarLabel: 'Recommendations',
    tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-leaf'} />
        </View>),
};


// Library Screen
const LibraryStack = createStackNavigator(
    {
        Library: SLibraryScreen,
    },
    config
);
LibraryStack.navigationOptions = {
    tabBarLabel: 'Library',
    tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-list-box'} />
        </View>),
};


// Settings Screen
const SettingsStack = createStackNavigator(
    {
        Settings: SSettingsScreen,
    },
    config
);
SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
        <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-settings'} />
        </View>),
};


const SMainAppStack = createMaterialBottomTabNavigator(
    {
        GardenStack,
        SearchStack,
        RecommendationsStack,
        LibraryStack,
        SettingsStack,
    },
    {
        web: { headerMode: 'screen' },
        default: {},
        initialRouteName: "GardenStack",
        activeColor: '#f0edf6',
        inactiveColor: '#226557',
        barStyle: { backgroundColor: '#3BAD87' },
    }

);

export default SMainAppStack;
