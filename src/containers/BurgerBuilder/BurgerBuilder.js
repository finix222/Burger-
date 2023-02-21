import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
// import axios from "axios";

const INGREDIENT_PRICES = {
  bacon: 0.3,
  meat: 0.7,
  salad: 0.2,
  cheese: 0.5,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 0,
      bacon: 0,
      meat: 0,
      salad: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };
  purchaseableHandler(newIngredients) {
    const sum = Object.keys(newIngredients)
      .map((igKeys) => {
        return newIngredients[igKeys];
      })
      .reduce((total, el) => total + el, 0);
    this.setState({
      purchaseable: sum > 0,
    });
    console.log(sum);
  }
  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const oldlPrice = this.state.totalPrice;
    const newPrice = oldlPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.purchaseableHandler(updatedIngredients);
  };
  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const oldlPrice = this.state.totalPrice;
    const newPrice = oldlPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.purchaseableHandler(updatedIngredients);
  };
  purchasingHandler=()=>{
    // const purchasing = this.state.purchasing
    this.setState({purchasing: true})
}
purchaseCancelHandler = ()=>{
    this.setState({purchasing: false})
}
purchaseContinueHandler = ()=>{
  const order = {
    ingredeint: this.state.ingredients,
    totalPrice: this.state.totalPrice,
    customer:{
      name: "ifeanyi",
      address:{
        street: 'yelwa',
        zipcode: "24554"
      }
    }

  }
  axios.post("/orders.json",order)
  .then(responese=>console.log(responese))
  .catch(error=>console.log(error))
}
  render() {
    const disabledInfor = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfor) {
      disabledInfor[key] = disabledInfor[key] <= 0;
    }

  
    return (
      <Aux>
        <Modal show={ this.state.purchasing} closeModal={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler} 
          price={this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredeintsAdded={this.addIngredientsHandler}
          ingredeintsRemoved={this.removeIngredientsHandler}
          disabled={disabledInfor}
          ordered={this.purchasingHandler}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
