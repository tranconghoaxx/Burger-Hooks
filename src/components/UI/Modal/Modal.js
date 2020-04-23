import React,{Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxi/ReactAux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        // if(nextProps.show !== this.props.show){
        //     return true;
        // }

        // them cai dang sau nay moi thay loading
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    // componentWillUpdate(){
    //     console.log('[Modal] WillUpdate');
    // }
    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        // dich chuyen 2d theo truc y doc
                        // transform: v bien doi
                        transform: this.props.show ?  'translateY(0vh)' : 'translateY(-100vh)',
                        // opacity/transparency: mo duc , trong suot
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
          </Aux>
        );
    }
} 

export default Modal;