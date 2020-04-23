import React,{Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders'; 
import Input from '../../../components/UI/Input/Input'; 
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility';
class ContactData extends Component {
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCoode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fasted',displayValue: 'Fastest'},
                        {value: 'cheapest',displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
        // loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        
        // this.setState({loading: true});

        // đây là form data nguoi dung nhap vao
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            //TA CÓ THỂ TẠO RA MỘT OBJECT MỚI VỚI CÁC THUỘC  TÍNH CỦA OBJECT CŨ VÀ TA CẬP NHẬT VALUE CHO NÓ
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const  order = {
            // ingredients: this.props.ingredients,
            ingredients: this.props.ings,
            price : this.props.price,
            // bo thong tin nguoi dat vao
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
        // axios.post('/orders.json',order)
        //     .then(response => {
        //         // console.log(response);
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //     });
    }
    inputChangedHandler = (event,inputIndentifier) => {
  
        const updatedFormElement = updateObject(this.state.orderForm[inputIndentifier],{
            value: event.target.value,
            valid: checkValidity(event.target.value,this.state.orderForm[inputIndentifier].validation),
            touched:true
        });
        const updatedOrderFrom = updateObject(this.state.orderForm,{
            [inputIndentifier]: updatedFormElement
        });
        console.log(updatedFormElement);
        let formIsValid = true;
        for(let inputIndentifier in updatedOrderFrom){
            formIsValid = updatedOrderFrom[inputIndentifier].valid && formIsValid;
        }
        // set lại state là xong
        this.setState({orderForm: updatedOrderFrom,formIsValid: formIsValid});
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        // false-> true
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId : state.auth.userId
    }
};
const  mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    };

};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));