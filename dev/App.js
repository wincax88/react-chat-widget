import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addUserMessage } from '../index';

export default class App extends Component {
  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
  }

  handleNewUserMessage = (newMessage) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  }

  onText() {
    const input = document.getElementById('input-text');
    addUserMessage(input.value)
  }

  handleMessageSubmit(userInput) {
    console.log('handleMessageSubmit', userInput);
    if (userInput.trim()) {
      addUserMessage(userInput);
    }
}

  render() {
    return (
      <div>
        <input type="text" id="input-text"/>
        <button type="button" onClick={this.onText}>send</button>
        <Widget
          title="Bienvenido"
          subtitle="Asistente virtual"
          senderPlaceHolder="Type message ..."
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          handleMessageSubmit={this.handleMessageSubmit}
          badge={1}
          maxLength={11}
        />
      </div>
    );
  }
}
