
import AuthScreen from '../screens/Auth/Auth'
import React,{Component} from 'react';
import {TouchableOpacity , Text} from 'react-native';
import { createBottomTabNavigator ,StackNavigator , createDrawerNavigator} from "react-navigation";
import SharePlaceScreen from '../screens/SharePlace/SharePlace';
import FindPlaceScreen from '../screens/FindPlace/FindPlace';
import  PlaceDetailScreen from '../screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen  from '../screens/SideDrawer/SideDrawer';
import MapScreen from '../screens/Map/Map'






export const Root = StackNavigator({
  Auth: {
    screen: AuthScreen,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Auth',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export const Drawer = createDrawerNavigator({
  Root: Root,
})

