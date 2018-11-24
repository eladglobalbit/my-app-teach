import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import  PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen  from './src/screens/SideDrawer/SideDrawer';
import MapScreen from './src/screens/Map/Map'

import configureStore from './src/store/configureStore';

const store = configureStore();


//Register
Navigation.registerComponent("my-app.AuthScreen" , () => AuthScreen ,store ,Provider);
Navigation.registerComponent("my-app.SharePlaceScreen" , () => SharePlaceScreen ,store ,Provider);
Navigation.registerComponent("my-app.FindPlaceScreen" , () => FindPlaceScreen ,store ,Provider);
Navigation.registerComponent("my-app.FindPlaceScreen" , () => FindPlaceScreen ,store ,Provider);
Navigation.registerComponent("my-app.PlaceDetailScreen" , () => PlaceDetailScreen ,store ,Provider);
Navigation.registerComponent("my-app.PlaceDetailScreen" , () => PlaceDetailScreen ,store ,Provider);
Navigation.registerComponent("my-app.SideDrawerScreen" , () => SideDrawerScreen ,store ,Provider);
Navigation.registerComponent("my-app.SideDrawerScreen" , () => SideDrawerScreen ,store ,Provider);
Navigation.registerComponent("my-app.MapScreen" , () => MapScreen ,store ,Provider);
//Start App

Navigation.startSingleScreenApp({
  screen: {
    screen: "my-app.AuthScreen",
    title: "Login"
  }
});