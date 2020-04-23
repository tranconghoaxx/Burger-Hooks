import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxi/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OderSummary/OderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import axios from '../../axios-orders';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
export class BurgerBuilder extends Component{
    state ={
        //  o day xoa ingredients
        // totalPrice : 4,
        purchasable: false
        // purchasing: false,
        // loading: false,
        // error : false
    }
    // Sau khi hàm render được gọi, component được hiển thị trên browser, và hàm componentDidMount được gọi sau đó.
    //Vì vậy, đây là nơi dùng để gọi các xử lý thao tác với DOM, gọi đến external APIs.
    componentDidMount(){
        // console.log(this.props);
        this.props.onInitIngredients();
        // axios.get('https://my-project-firebase-8b1a9.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients:response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error:true})
        //     });
    }

    // thay doi nut order now hien thi
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);
        // return moi duco
        return  sum > 0;
    }
    purchaseHanler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }
    purchaseCanceHandler = () => {
        this.setState({purchasing: false});
    }
// co redux thi lam it lai nhu nay
    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+ this.state.totalPrice);
        // const queryString  = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render() {
        // thay doi state sang props
        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger =  this.props.error ? <p>Ingredients can't  be loaded</p> : <Spinner />;
        // thay doi state o day(o dau co ingredients la thay doi)
        if(this.props.ings){
            burger =  ( 
                <Aux>
                    {/* thay doi o day ingredients */}
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                    // ingredientAdded={this.addIngredientHandler}
                    ingredientAdded={this.props.onIngredientAdded}
                    // ingredientRemoved={this.removeIngredientHandler}
                    ingredientRemoved={this.props.onIngredientRemove}
                    disabled={disabledInfo}
                    // purchasable={this.state.purchasable}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHanler}
                    isAuth={this.props.isAuthenticated}
                    // price={this.state.totalPrice}
                    price={this.props.price} />
                </Aux>
            );
            orderSummary =  <OderSummary 
            // thay doi ingredients o day
                ingredients={this.props.ings}
                // price={this.state.totalPrice}
                price={this.props.price}
                purchaseCanceled={this.purchaseCanceHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner />;
        // }
  
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceHandler}> 
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        //  them price o day
        price: state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch =>  {
    return {
        // onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName: ingName}),
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        // onIngredientRemove: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios));