import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Widget from './components/Widget';
import store from '../src/store/store';

const ConnectedWidget = props =>
  <Provider store={store}>
    <Widget
      title={props.title}
      titleAvatar={props.titleAvatar}
      subtitle={props.subtitle}
      handleNewUserMessage={props.handleNewUserMessage}
      handleQuickButtonClicked={props.handleQuickButtonClicked}
      handleMessageSubmit={props.handleMessageSubmit}
      senderPlaceHolder={props.senderPlaceHolder}
      profileAvatar={props.profileAvatar}
      showCloseButton={props.showCloseButton}
      fullScreenMode={props.fullScreenMode}
      badge={props.badge}
      autofocus={props.autofocus}
      customLauncher={props.launcher}
      maxLength={props.maxLength}
      sendInterval={props.sendInterval}
    />
  </Provider>;

ConnectedWidget.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  handleNewUserMessage: PropTypes.func.isRequired,
  handleQuickButtonClicked: PropTypes.func,
  handleMessageSubmit:PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  launcher: PropTypes.func,
  maxLength: PropTypes.number,
  sendInterval: PropTypes.number,
};

ConnectedWidget.defaultProps = {
  title: 'Welcome',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  badge: 0,
  autofocus: false,
  maxLength: 1024,
  sendInterval: 500, // 500ms
};

export default ConnectedWidget;
