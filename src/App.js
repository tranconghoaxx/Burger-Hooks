import React,{ useEffect } from 'react';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurderBuilder from './containers/BurderBuilder/BurderBuilder';

import  Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';



const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Oders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  },[]);
    let routes = (
      <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurderBuilder} />
          <Redirect to="/" />
      </Switch>
    );
    if(props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurderBuilder} />
        </Switch>
      );
    }

    return (
    <div>
        <Layout>
              {routes}
        </Layout>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup:() => dispatch(actions.authCheckState())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
