import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxi from '../Auxi/ReactAux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toobar/Toobar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHanler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render(){
        return (
            <Auxi>
                <Toolbar 
                        isAuth={this.props.isAuthenticated}
                        drawerToggleClicked={this.sideDrawerToggleHanler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={ classes.Content }>
                    {this.props.children}
                </main>
            </Auxi>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};
export default connect(mapStateToProps)(Layout);