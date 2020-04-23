// delay no tri hoan viec thuc hien buoc tiep theo
import {delay} from 'redux-saga/effects';
// call : la function cho phep ta call mot so function vao mot so object

import {put,call} from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
// o day la chuyen doi các hàm asynchronous(bat dong bo) ve synchronous(dong bộ)
// lấy bên action sang

// day se khong phai la mot function ma la mot loai cua function
// * o day rất quan trọng: no chuyển chức năng này thanh cái gọi là generator (n: người sinh ra,máy phát)
// Generators là next generation javascript features nó là cac function có thể thực hiện từng bước(adv:incrementally)
// chúng ta có thể thực hiện synchronous ở đây(đồng bộ)
export function* logoutSaga(action){
    yield call([localStorage,'removeItem'],"token");
    yield call([localStorage,'removeItem'],"expirationDate");
    yield call([localStorage,'removeItem'],"userId");
    yield put(actions.logoutSucceed());
    // và cuối cùng gọi put nó sẽ dispatch(n:phái tới,gửi công văn) tới action
}
export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000 );//tri hoan(delay) viec thu hien tiep tuc cho viec nay 1 khoang time
    // cho mot khong time o tren xong roi moi logout
    yield put(actions.logout());
}
export function* authUserSaga(action){
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8Zzfc-qwiv4gjs21poVFizhDpd8esNw0';
    if(!action.isSigup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8Zzfc-qwiv4gjs21poVFizhDpd8esNw0';
    }
    try{
    const response = yield axios.post(url,authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token',response.data.idToken);
    yield localStorage.setItem('expirationDate',expirationDate);
    yield localStorage.setItem('userId',response.data.localId);
    yield put(actions.authSuccess(response.data.idToken,response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }catch(error){
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if(!token){
       yield put(actions.logout());
    }else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()){
            yield put(actions.logout());
        }
        else{
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token,userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}