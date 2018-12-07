
import AuthScreen from '../screens/Auth/Auth'
import React,{Component} from 'react';
import {TouchableOpacity , Text , View} from 'react-native';
import { createBottomTabNavigator ,StackNavigator , createStackNavigator ,createSwitchNavigator,DrawerNavigator } from "react-navigation";
import SharePlaceScreen from '../screens/SharePlace/SharePlace';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FindPlaceScreen from '../screens/FindPlace/FindPlace';
import PlaceDetail from '../screens/PlaceDetail/PlaceDetail';
import SideMenu from '../screens/SideMenu/SideMenu';
import Chat from '../screens/Chat/Chat'




export const Tabs = createBottomTabNavigator({
  HomeStack: {
    screen: FindPlaceScreen,
  },
  Detail: {
    screen: SharePlaceScreen,
  },
}, {
  tabBarOptions: {
    scrollEnabled: false,
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#000',
    },
    indicatorStyle: {
      backgroundColor: '#000',
    },
  },
});


const AppStack = StackNavigator({
  MyPlaces : {
    screen: Tabs,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: <Text style={{flex: 1, textAlign: 'center', color: 'blue', fontSize: 32,marginLeft:-20}}>My places</Text>,
      headerLeft: 
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity underlayColor={"transparent"} style={{marginRight: 20}} onPress={navigation.openDrawer}><MaterialCommunityIcons name="menu" size={36}/></TouchableOpacity>
        </View>
      ,     
    }),
  },
  PlaceDetail: {
    screen: PlaceDetail,
  },Chat: {
    screen: Chat,
  },
}, {
  mode: 'modal',
  initialRouteName: 'MyPlaces',
  navigationOptions: {
    gesturesEnabled: false,
  },
  cardStyle: { backgroundColor: '#FFFFFF' },
});

const AuthStack = createStackNavigator( { 
  Auth: {
  screen: AuthScreen
 },
});



export const  Root =  DrawerNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
    contentComponent: SideMenu,
    drawerWidth: 300
  } ,
);



