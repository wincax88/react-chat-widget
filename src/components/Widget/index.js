import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {debounce} from 'lodash';
import { toggleChat, addUserMessage } from '@actions';

import WidgetLayout from './layout';

class Widget extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreenMode) {
      this.props.dispatch(toggleChat());
    }
  }

  toggleConversation = () => {
    this.props.dispatch(toggleChat());
  }

  processMessage = debounce(userInput => {
    if (userInput.trim()) {
      if (!this.props.handleMessageSubmit) {
        this.props.dispatch(addUserMessage(userInput));
      } else{
        this.props.handleMessageSubmit(userInput)
      }
      this.props.handleNewUserMessage(userInput);
    }
  }, this.props.sendInterval);

  handleMessageSubmit = (event) => {
    event.preventDefault();
    const userInput = event.target.message.value;
    this.processMessage(userInput);
    event.target.message.value = '';
  }

  handleQuickButtonClicked = (event, value) => {
    event.preventDefault();

    if(this.props.handleQuickButtonClicked) {
      this.props.handleQuickButtonClicked(value);
    }
  }

  render() {
    return (
      <WidgetLayout
        onToggleConversation={this.toggleConversation}
        onSendMessage={this.handleMessageSubmit}
        onQuickButtonClicked={this.handleQuickButtonClicked}
        title={this.props.title}
        titleAvatar={this.props.titleAvatar}
        subtitle={this.props.subtitle}
        senderPlaceHolder={this.props.senderPlaceHolder}
        profileAvatar={this.props.profileAvatar}
        showCloseButton={this.props.showCloseButton}
        fullScreenMode={this.props.fullScreenMode}
        badge={this.props.badge}
        autofocus={this.props.autofocus}
        customLauncher={this.props.customLauncher}
        maxLength={this.props.maxLength}
      />
    );
  }
}

Widget.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  handleNewUserMessage: PropTypes.func.isRequired,
  handleQuickButtonClicked: PropTypes.func.isRequired,
  handleMessageSubmit:PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func,
  maxLength: PropTypes.number,
  sendInterval: PropTypes.number,
};

export default connect()(Widget);
