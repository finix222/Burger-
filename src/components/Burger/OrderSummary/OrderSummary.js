import React from "react";
import Aux from "../../../hoc/Auxilary";
import Button from "../../UI/Button/Button";
const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igkeys) => {
    return (
      <li key={igkeys + 1}>
        {igkeys}: {props.ingredients[igkeys]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Your burger ingredients</p>
      <ul>{ingredientsSummary}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  );
};
export default OrderSummary;
