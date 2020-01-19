import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addUserMessage } from '../index';

export default class App extends Component {
  componentDidMount() {
    const timestamp = new Date().getTime();
    addResponseMessage({text:'Welcome to this awesome chat!', nick:'others', uid:'others', timestamp: timestamp});
  }

  handleNewUserMessage = (newMessage) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        const timestamp = new Date().getTime();
        addResponseMessage({text:newMessage, nick:'others', uid:'others', timestamp: timestamp });
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  }

  onText() {
    const input = document.getElementById('input-text');
    const timestamp = new Date().getTime();
    addUserMessage({text:input.value, nick:'others', uid:'others', timestamp: timestamp})
  }

  handleMessageSubmit(userInput) {
    console.log('handleMessageSubmit', userInput);
    if (userInput.trim()) {
      const timestamp = new Date().getTime();
      addUserMessage({text:userInput, nick:'me', uid:'me', timestamp: timestamp});
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
