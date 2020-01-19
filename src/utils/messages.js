import { Map } from 'immutable';
import moment from 'moment'
import { MESSAGES_TYPES, MESSAGE_SENDER, MESSAGE_BOX_SCROLL_DURATION } from '@constants';

import Message from '@messagesComponents/Message';
import Snippet from '@messagesComponents/Snippet';
import QuickButton from '@quickButtonsComponents/QuickButton';

require('moment/locale/zh-cn')

export function createNewMessage(message, sender) {
  return Map({
    type: MESSAGES_TYPES.TEXT,
    component: Message,
    text: message.text,
    nick: message.nick,
    uid: message.uid,
    timestamp: message.timestamp,
    sender,
    showAvatar: sender === MESSAGE_SENDER.RESPONSE
  });
}

export function createLinkSnippet(link) {
  return Map({
    type: MESSAGES_TYPES.SNIPPET.LINK,
    component: Snippet,
    title: link.title,
    link: link.link,
    target: link.target || '_blank',
    sender: MESSAGE_SENDER.RESPONSE,
    showAvatar: true
  });
}

export function createComponentMessage(component, props, showAvatar) {
  return Map({
    type: MESSAGES_TYPES.CUSTOM_COMPONENT,
    component,
    props,
    sender: MESSAGE_SENDER.RESPONSE,
    showAvatar
  });
}

/**
 * Easing Functions
 * @param {*} t timestamp
 * @param {*} b begining
 * @param {*} c change
 * @param {*} d duration
 */
function sinEaseOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

/**
 *
 * @param {*} target scroll target
 * @param {*} scrollStart
 * @param {*} scroll scroll distance
 */
function scrollWithSlowMotion(target, scrollStart, scroll) {
  const raf = window.webkitRequestAnimationFrame || window.requestAnimationFrame
  let start = null
  const step = (timestamp) => {
    if (!start) {
      start = timestamp
    }
    let stepScroll = sinEaseOut(timestamp - start, 0, scroll, MESSAGE_BOX_SCROLL_DURATION)
    let total = scrollStart + stepScroll
    target.scrollTop = total;
    if (total < scrollStart + scroll) {
      raf(step)
    }
  }
  raf(step)
}

export function scrollToBottom(messagesDiv) {
  if (!messagesDiv) return;
  const screenHeight = messagesDiv.clientHeight;
  const scrollTop = messagesDiv.scrollTop;

  const scrollOffset = messagesDiv.scrollHeight - (scrollTop + screenHeight)

  scrollOffset && scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
}


export function createQuickButton(button) {
  return Map({
    component: QuickButton,
    label: button.label,
    value: button.value
  });
}

export function getFormatTime(timestamp) {
  if (moment().year() === moment(timestamp).year()) {
    if (moment().dayOfYear() === moment(timestamp).dayOfYear()) {
      return moment(timestamp).format('HH:mm');
    } else {
      return moment(timestamp).format('MM-DD HH:mm');
    }
  } else {
    return moment(timestamp).format('YYYY-MM-DD HH:mm');
  }
}
