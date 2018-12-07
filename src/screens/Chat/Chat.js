// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import Fire from '../../../Fire';
import { connect } from "react-redux";




class Chat extends React.Component{

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  constructor(props) {
    super(props);
    console.log(this.props.uid)
    console.log(this.user)
  }

  state = {
    messages: [],
    fire : new Fire(this.props.token)
  };

  get user() {
    return {
      name:'guest',
      _id: this.props.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.state.fire.send}
        user={this.user}
      />
    );
  }

  // componentDidMount() {
  //   this.state.fire.on(
  //     msg => this.setState({messages : [...msg]})
  //   )
  // }

  componentDidMount() {
    this.state.fire.on(message =>{
      console.log(message)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    });
  }

}
const mapStateToProps = state => {
  return {
    token : state.auth.token,
    uid: state.auth.uid
  };
};

export default connect(mapStateToProps)(Chat);
