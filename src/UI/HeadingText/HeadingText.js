import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

const HeadingText = (props) => (
    <Text {...props} style={[styles.textHeading, props.style]}>{props.children}</Text>
);

export default HeadingText;


const styles = StyleSheet.create({
    textHeading: {
        fontSize: 28,
        fontWeight: 'bold'
    },
});