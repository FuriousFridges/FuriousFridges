import React from 'react';
import Transit from '../../client/src/components/Transit.jsx';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';


it('renders correctly', () => {
  const tree = renderer.create(
    <Transit />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

