import {put} from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';
// cac ham synchronous dong bo vao day
export function* initIngredientsSaga(action) {
    try{
        const response = yield axios.get(
            'https://my-project-firebase-8b1a9.firebaseio.com/ingredients.json'
        );
        yield put(actions.setIngredients(response.data));
    }catch(error){
        yield put(actions.fetchIngredientsFailed());
    }
}