import React, {Component} from 'react';
import Aux from '../../../hoc/Auxi/ReactAux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
    // componentWillUpdate(){
    //     console.log('[OrderSummary] WillUpdate');
    // }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            // viet hoa dau moi tu
            return (
                <li key={igKey}> 
                    <span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>) ;
        });
        return (
            <Aux>
                <h3>Your Oder</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType={"Danger"} clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType={"Success"} clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}
export default OrderSummary;