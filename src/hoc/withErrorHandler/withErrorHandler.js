import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi/ReactAux';
import { render } from '@testing-library/react';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state ={
            error : null
        }
        // đây là method sẽ được thực thi trước khi 1 component được render trên cả server side và  client side.
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                this.setState({error:error});
            });
        }
        //  được gọi khi chúng ta unmout 1 component kiểu như xóa nó khỏi react.
        componentWillUnmount(){
            // console.log('Will Unmount',this.reqInterceptor,this.resInterceptor);
            //If you need to remove an interceptor later you can. eject
            // reject:v tu choi
            // eject:v day ra
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
                this.setState({error: null})
        }
        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;