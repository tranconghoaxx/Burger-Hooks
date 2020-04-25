import React, { useState,useEffect,useCallback } from 'react';
import {connect,useDispatch,useSelector} from 'react-redux';

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

const  BurgerBuilder = props => {
    const [purchasing,setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });
    const price  = useSelector(state => state.burgerBuilder.totalPrice);
    const error  = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemove = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),[dispatch]
    );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

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
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }
    const purchaseCanceHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }
    
        const disabledInfo = {
            ...ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger =  error ? <p>Ingredients can't  be loaded</p> : <Spinner />;
        // thay doi state o day(o dau co ingredients la thay doi)
        if(ings){
            burger =  ( 
                <Aux>

                    <Burger ingredients={ings} />
                    <BuildControls 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemove}
                    disabled={disabledInfo}
                    // purchasable={this.state.purchasable}
                    purchasable={updatePurchaseState(ings)}
                    ordered = {purchaseHanler}
                    isAuth={isAuthenticated}
                    // price={this.state.totalPrice}
                    price={price} />
                </Aux>
            );
            orderSummary =  <OderSummary 
                ingredients={ings}
                price={price}
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

export default withErrorHandler(BurgerBuilder, axios);