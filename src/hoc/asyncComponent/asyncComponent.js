// xu ly bat dong bo
import React, {Component} from 'react';
const asyncComponent = (importComponent) => {
    return class extends Component{
        state = {
            component : null
        }
        //Sau khi hàm render được gọi, component được hiển thị trên browser, và hàm componentDidMount được gọi sau đó.
        // Vì vậy, đây là nơi dùng để gọi các xử lý thao tác với DOM, gọi đến external APIs.
        componentDidMount(){
            importComponent()
            //The then() method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }
        render(){
            const C = this.state.component;
            return C ? <C {...this.props}/>: null;
        }
    }
}
export default asyncComponent;