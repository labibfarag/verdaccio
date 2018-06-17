/**
 * Package component
 */

import React from 'react';
import { mount } from 'enzyme';
import Package from '../../../../src/webui/src/components/Package/index';
import { BrowserRouter } from 'react-router-dom';

describe('<Package /> component', () => {
  it('should load the component', () => {
    const props = {
      name: 'verdaccio',
      version: '1.0.0',
      time: '2018-05-03T23:36:55.046Z',
      license: 'MIT',
      description: 'Private NPM repository',
      author: { name: 'Sam' }
    };
    const wrapper = mount(
      <BrowserRouter>
        <Package package={props} />
      </BrowserRouter>
    );

    // renderAuthor method
    const renderAuthor = wrapper.find(Package).instance().renderAuthor;
    expect(renderAuthor({ author: {} })).toBeUndefined();
    expect(renderAuthor({ author: { name: 'sam' } })).toBeDefined();

    // integration expectations
    expect(wrapper.find('a').prop('href')).toEqual('detail/verdaccio');
    expect(wrapper.find('h1').text()).toEqual('verdaccio v1.0.0');
    expect(wrapper.find('.el-tag--gray').text()).toEqual('v1.0.0');
    expect(
      wrapper.find('div').filterWhere(n => n.prop('role') === 'author')
        .text()
    ).toEqual('By: Sam');
    expect(wrapper.find('p').text()).toEqual('Private NPM repository');
    expect(wrapper.find('.homepage').text()).toMatch(/Published about/);
    expect(wrapper.find('.license').text()).toMatch(/MIT/);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
