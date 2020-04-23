import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component{
    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    // Redux khong can nay luon
    // state = {
    //     ingredients: null,
    //     price : 0
    // }

    // componentDidMount -> componentWillMount
    //đây là method sẽ được thực thi trước khi 1 component được render trên cả server side và  client side.

    // ==> Redux khong can cai nay luon
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = + param[1];
    //         }
          
    //     }
    //     this.setState({ingredients:ingredients,totalPrice: price});
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary  = <Redirect to="/"/>
     
        if(this.props.ings){ 
            const   purchasedRedirect   =  this.props.purchased ? <Redirect to="/" />: null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                    path={this.props.match.url + '/contact-data' } 
                    component={ContactData}/> 
                </div>
  
            );
        }
        return summary;
        // return(
        //     <div>
        //         {/* <CheckoutSummary 
        //             // ingredients={this.state.ingredients}
        //             ingredients={this.props.ings}
        //             onCheckoutCancelled={this.checkoutCancelledHandler}
        //             checkoutContinued={this.checkoutContinuedHandler} /> */}
        //             {summary}
        //             {/* <Route 
        //                 path={this.props.match.url + '/contact-data' } 
        //                 // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
        //                 component={ContactData}/>    */}
        //     </div>
        // );
    }
}
const mapStateToProps = state => {
    return {
        // ingredients phai la name ben store reducer khong dduoc dat khac
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};
// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase:() => dispatch(actions.purchaseInit)
//     };
// };
export default connect(mapStateToProps)( Checkout);