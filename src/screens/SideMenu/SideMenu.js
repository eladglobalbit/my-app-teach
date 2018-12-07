import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet,TouchableOpacity , Platform ,ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";

import { authLogout } from "../../store/actions/index";
class SideMenu extends Component {

    logOut = () => {
        this.props.onLogout( () => this.props.navigation.navigate('Auth') );
    }

  render() {
    return (
      <View
        style={styles.container}
      >
      <ScrollView style={{flex:1}}>
      <TouchableOpacity onPress={this.logOut}>
        <View style={styles.darwItem}>
          <Icon name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawItemIcon}/>
        <Text>Sign Out</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')}>
        <View style={styles.darwItem}>
          <Icon name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawItemIcon}/>
        <Text>Chat</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 30,
      backgroundColor: "white",
      flex: 1
    },
    darwItem : { 
      flexDirection: 'row',
      alignContent: 'center',
      padding: 10,
      backgroundColor: '#eee'
    },
    drawItemIcon: {
      marginRight: 10
    }
  });
  
const mapDispatchToProps = dispatch => {
    return {
      onLogout: (nav) => dispatch(authLogout(nav))
    };
  };
  
export default connect(null, mapDispatchToProps)(SideMenu);
