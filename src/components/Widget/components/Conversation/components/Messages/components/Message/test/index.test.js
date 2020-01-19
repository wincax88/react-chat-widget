import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createNewMessage } from '@utils/messages';
import Message from '../index';

configure({ adapter: new Adapter() });

describe('<Message />', () => {
  /* eslint-disable no-underscore-dangle */
  const createMessageComponent = message => shallow(<Message message={message} />);
  const timestamp = new Date().getTime();

  it('should render a <strong> element', () => {
    const message = createNewMessage({text:'New message with **Markdown**!', nick:'test', uid: 'test', timestamp: timestamp});
    const messageComponent = createMessageComponent(message);
    expect(messageComponent.find('.rcw-message-text').getElement().props.dangerouslySetInnerHTML.__html).toMatchSnapshot();
  });

  it('should reder a <em> element', () => {
    const message = createNewMessage({text:'New message with *Markdown*!', nick:'test', uid: 'test', timestamp: timestamp});
    const messageComponent = createMessageComponent(message);
    expect(messageComponent.find('.rcw-message-text').getElement().props.dangerouslySetInnerHTML.__html).toMatchSnapshot();
  });
  /* eslint-enable */
});
