import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//
import getStore from '../data/store/store';
import { TodoItem } from '../components/molecules/TodoItem';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = mount(
    <Provider store={getStore()}>
      <TodoItem task={{ id: 'fghjsfg', title: 'nonono', completed: false }} />
    </Provider>,
  );
  expect(wrapper.exists()).toBe(true);
});
