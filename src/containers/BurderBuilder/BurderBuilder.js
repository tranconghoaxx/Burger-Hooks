import React, { useState,useEffect } from 'react';
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
const  BurgerBuilder = props => {
    const [purchasing,setPurchasing] = useState(false);

    const {onInitIngredients} = props;
    useEffect(() => {
        onInitIngredients();
    },[onInitIngredients]);

    const updatePurchaseState = (ingredients) =>  {
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
    const purchaseHanler = () => {
        if(props.isAuthenticated){
            setPurchasing(true);
        }else{
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }
    const purchaseCanceHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }
    
        const disabledInfo = {
            // ...this.state.ingredients
            ...props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger =  props.error ? <p>Ingredients can't  be loaded</p> : <Spinner />;
        // thay doi state o day(o dau co ingredients la thay doi)
        if(props.ings){
            burger =  ( 
                <Aux>
                    {/* thay doi o day ingredients */}
                    <Burger ingredients={props.ings} />
                    <BuildControls 
                    // ingredientAdded={this.addIngredientHandler}
                    ingredientAdded={props.onIngredientAdded}
                    // ingredientRemoved={this.removeIngredientHandler}
                    ingredientRemoved={props.onIngredientRemove}
                    disabled={disabledInfo}
                    // purchasable={this.state.purchasable}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered = {purchaseHanler}
                    isAuth={props.isAuthenticated}
                    // price={this.state.totalPrice}
                    price={props.price} />
                </Aux>
            );
            orderSummary =  <OderSummary 
                ingredients={props.ings}
                price={props.price}
                purchaseCanceled={purchaseCanceHandler}
                purchaseContinued={purchaseContinueHandler} />
        }
  
        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCanceHandler}> 
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
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