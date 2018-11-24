import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';

const MainText = (props) => (
    <Text style={[styles.mainText, props.style]}>{props.children}</Text>
);

export default MainText;

const styles = StyleSheet.create({
    mainText: {
        color: 'black',
        backgroundColor: 'transparent',
    }
});