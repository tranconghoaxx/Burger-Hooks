import React, {useState} from 'react';
import {connect} from 'react-redux';

import Auxi from '../Auxi/ReactAux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toobar/Toobar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible,setSideDrawerIsVisible] = useState(false);
    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }
    const sideDrawerToggleHanler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }
        return (
            <Auxi>
                <Toolbar 
                        isAuth={props.isAuthenticated}
                        drawerToggleClicked={sideDrawerToggleHanler} />
                <SideDrawer 
                    isAuth={props.isAuthenticated}
                    open={sideDrawerIsVisible} 
                    closed={sideDrawerClosedHandler} />
                <main className={ classes.Content }>
                    {props.children}
                </main>
            </Auxi>
        );
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};
export default connect(mapStateToProps)(Layout);