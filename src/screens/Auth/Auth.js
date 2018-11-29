import React , { Component} from 'react';
import {connect} from 'react-redux';
import {View,
    Dimensions,
    StyleSheet, 
    ImageBackground,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultInput from '../../UI/DefaultInput/DefaultInput';
import StartMainTabs from '../MainTabs/MainTabs';
import HeadingText from '../../UI/HeadingText/HeadingText';
import ButtonWithBackground from '../../UI/ButtonWithBackground/ButtonWithBackground';
import MainText from '../../UI/MainText/MainText';
import backgroundImage from '../../assest/background.jpg';
import validate from '../../utliity/validtion';
import {tryAuth} from '../../store/actions/index';


class AuthScreen extends Component {
    state = {
        repStyles : {
            pwContainerDirection: 'column',
            pwContainerJustifyContent: 'flex-start',
            pwWarpperWidth: '100%'
        },
        authMode: 'login',
        controls: {
            email:{
                value:"",
                valid:false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password:{
                value:"",
                valid:false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword:{
                value:"",
                valid:false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    };
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change' ,this.updateStyles);
    }
    componentWillUnmount(){
        Dimensions.removeEventListener('change',this.updateStyles);
    }

    updateStyles = (dims) => {
        // could do this wqith styles boolean 
        this.setState({
            repStyles: {
                pwContainerDirection: dims.height > 500 || this.state.authMode === 'login' ? 'column' : 'row',
                pwContainerJustifyContent:dims.height > 500 || this.state.authMode === 'login' ? 'flex-start' : 'space-between' ,
                pwWarpperWidth: dims.window.height > 500 || this.state.authMode === 'login' ? '100%' : '45%'
            }
        });
    }

    loginHandler = ()=> {
        const authData = { 
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin()
        StartMainTabs();
    }

    switchAuthMode = () => { 
        this.setState(prevState =>{
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            };
        });
    };

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
          const equalControl = this.state.controls[key].validationRules.equalTo;
          const equalValue = this.state.controls[equalControl].value;
          connectedValue = {
            ...connectedValue,
            equalTo: equalValue
          };
        }
        if (key === "password") {
          connectedValue = {
            ...connectedValue,
            equalTo: value
          };
        }
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              confirmPassword: {
                ...prevState.controls.confirmPassword,
                valid:
                  key === "password"
                    ? validate(
                        prevState.controls.confirmPassword.value,
                        prevState.controls.confirmPassword.validationRules,
                        connectedValue
                      )
                    : prevState.controls.confirmPassword.valid
              },
              [key]: {
                ...prevState.controls[key],
                value: value,
                valid: validate(
                  value,
                  prevState.controls[key].validationRules,
                  connectedValue
                ),
                touched: true
              }
            }
          };
        });
      };

    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        if(Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                <HeadingText>Auth screen</HeadingText>
                </MainText>
            );
        }
        if(this.state.authMode === 'signup'){
            confirmPasswordControl = (
                <View style={{
                    width: this.state.repStyles.pwWarpperWidth
                    }}>
                    <DefaultInput placeholder="renter password" 
                    value={this.state.controls.confirmPassword.value} 
                    onChangeText={ (val)=> this.updateInputState('confirmPassword',val) } 
                    style={styles.input}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry/>
                </View>
            );
        }
        return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                {headingText}
                <ButtonWithBackground color="#29aaf4" onPress={this.switchAuthMode}>
                Swtich to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
                </ButtonWithBackground>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="email" 
                        value={this.state.controls.email.value} 
                        onChangeText={ (val)=> this.updateInputState('email',val) } 
                        style={styles.input}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'/>
                        <View style={{
                            flexDirection: this.state.repStyles.pwContainerDirection,
                            justifyContent: this.state.repStyles.pwContainerJustifyContent
                            }}> 
                            <View style={{
                                width: this.state.repStyles.pwWarpperWidth
                                }}>
                                <DefaultInput placeholder="password" 
                                value={this.state.controls.password.value} 
                                onChangeText={ (val)=> this.updateInputState('password',val) } 
                                style={styles.input}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                secureTextEntry/>
                            </View>
                            {confirmPasswordControl}
                        </View>
                    </View>                
                </TouchableWithoutFeedback>
                <ButtonWithBackground color="#29aaf4"
                 onPress={this.loginHandler}
                 disable={
                    (!this.state.controls.confirmPassword.valid || 
                    !this.state.controls.password.valid || 
                    !this.state.controls.email.valid) && this.state.authMode==='signup'}>Submit</ButtonWithBackground>
            </KeyboardAvoidingView>
        </ImageBackground>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogin: authData => dispatch(tryAuth(authData)),
    };
};
  
export default connect(null, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        flex:1
    },  
    inputContainer:{
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        borderColor:'#bbb'
    },
    passwordContent: {
        flexDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
        justifyContent: 'space-between'
    },
    passordWrapper: {
        width: Dimensions.get('window').height > 500 ? '100%' : '45%'
    }
});