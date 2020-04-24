import React,{ useEffect,Suspense } from 'react';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurderBuilder from './containers/BurderBuilder/BurderBuilder';

import  Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';



const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
  return import('./containers/Oders/Orders');
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  },[]);
    let routes = (
      <Switch>
          <Route path="/auth" render={() => <Auth/>} />
          <Route path="/" exact component={BurderBuilder} />
          <Redirect to="/" />
      </Switch>
    );
    if(props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/checkout" render={() => <Checkout/> }/>
            <Route path="/orders" render={() => <Orders />} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" render={() => <Auth />} />
            <Route path="/" exact component={BurderBuilder} />
        </Switch>
      );
    }

    return (
    <div>
        <Layout>
             <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense> 
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
