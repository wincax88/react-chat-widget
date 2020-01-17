import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmojiButton from '@joeattardi/emoji-button';

import send from '@assets/send_button.svg';
import emoji from '@assets/emoji.svg';

import './style.scss';

const options = {
  autoHide: false,
  showSearch: false,
  autoFocusSearch: false,
  position: 'top',
  zIndex: 10000
};
const picker = new EmojiButton(options);

class Sender extends Component{
  input = React.createRef();

  componentDidMount() {
    picker.on('emoji', emoji => {
      const input = document.getElementById('message-input');
      input.value += emoji;
    });
  }

  componentDidUpdate() {
    this.input.current.focus();
  }

  onEmoji(event) {
    event.preventDefault();
    const button = document.getElementById('emoji-button');
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
  }



  render() {
    const { sendMessage, placeholder, disabledInput, autofocus, maxLength } = this.props;
    return (
      <form className="rcw-sender" onSubmit={sendMessage}>
        <input type="text" className="rcw-new-message" name="message" id="message-input" placeholder={placeholder} disabled={disabledInput} autoFocus={autofocus} autoComplete="off" maxLength={maxLength} ref={this.input} />
        <button type="button" className="rcw-emoji" id="emoji-button" onClick={this.onEmoji} >
          <img src={emoji} className="rcw-emoji-icon" alt="emoji" />
        </button>
        <button type="submit" className="rcw-send">
          <img src={send} className="rcw-send-icon" alt="send" />
        </button>
      </form>
    );
  }

}

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
  autofocus: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default Sender;
