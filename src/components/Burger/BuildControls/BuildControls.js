import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuilControl/BuildControl';
const controls = [
    {lable:'Salad',type:'salad'},
    {lable:'Bacon',type:'bacon'},
    {lable:'Cheese',type:'cheese'},
    {lable:'Meat',type:'meat'},
];


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
       {controls.map(ctrl => (
           <BuildControl 
           key={ctrl.lable} 
           lable={ctrl.lable}
           added={ () => props.ingredientAdded(ctrl.type)}
           removed={()=> props.ingredientRemoved(ctrl.type)}
           disabled={props.disabled[ctrl.type]}
           />
       ))}

       <button 
            className={classes.OrderButton}
            // disable =false la bam van ok true moi khong cho bam
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;