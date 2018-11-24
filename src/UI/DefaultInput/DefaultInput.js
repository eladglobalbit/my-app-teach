import  React, { Component } from 'react';
import { View, Text ,TextInput,StyleSheet} from 'react-native';

const deafaultInput =  (props) => (
    <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input,props.style, props.touched && !props.valid ?  styles.invalid : null]}
    />

)

export default deafaultInput;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth:1 ,
        borderColor : '#eee',
        padding: 5,
        marginTop: 8,
        marginBottom: 8
    },
    invalid:{
        backgroundColor: '#f9c0c0',
        borderColor: 'red',
        borderWidth: 1
    }

});