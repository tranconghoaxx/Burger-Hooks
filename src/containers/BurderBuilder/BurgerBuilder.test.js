
import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurderBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />',() => {
    let wrapper;
    beforeEach(() => {
        // Shallow Rendering sử dụng trong trường hợp không cần render child component 
        //của component còn khi cần render child component thì bạn dùng mount Rendering 
        wrapper = shallow(<BurgerBuilder onInitIngredients = {() => {}}/>);
        
        });
        //Đầu tiên là it. Nó chính là cấu trúc của 1 test cơ bản nhất: jest
        //Bao gồm 2 tham số: it('description of the test', 'function containing our tes logic') 
        //Tham số đầu tiên là 1 chuỗi nhằm mô tả mục đích của test này đang muốn test cái j?
        // Tham số thứ 2 là 1 function sẽ chứa các logic để chạy.
        //Snapshot Testing
        it('should render <BuildControls/> when receving ingredients',() => {
            //A method that sets the props of the root component, and re-renders.
            // Useful for when you are wanting to test how the component behaves over time 
            //with changing props. Calling this, for instance, 
            //will call the componentWillReceiveProps lifecycle method.
            wrapper.setProps({ings:{salad: 0}});
            //When you're writing tests, you often need to check that values meet certain conditions.
            // expect gives you access to a number of "matchers" that let you validate different things.
            expect(wrapper.find(BuildControls)).toHaveLength(1);
        });
});