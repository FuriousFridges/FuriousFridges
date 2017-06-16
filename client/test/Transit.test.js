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

// describe('A suite to test the Transit component', () => {

//   it('Expect Transit.jsx to render without throwing an error', () => {
//      const wrapper = shallow(<Transit />);
//       expect(wrapper).toMatchSnapshot();
//    });
// });



// describe('A suite to test the Transit component', () => {
 
  // test('contains spec with an expectation', function() {
  //   expect(true).toBeTruthy();
  // });

//   it('should render <Transit />', () => {
//     const wrapper = shallow(<Transit />);
//     expect(wrapper).toMatchSnapshot();
//   });

// });


//   test('Transit component should render as expected', () => {
//   const component = shallow(<Transit />)
//   const tree = toJson(component)

//   expect(tree).toMatchSnapshot()
// })

