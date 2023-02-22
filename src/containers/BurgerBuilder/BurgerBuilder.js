import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/withErrorHandler";
// import axios from "axios";

const INGREDIENT_PRICES = {
  bacon: 0.3,
  meat: 0.7,
  salad: 0.2,
  cheese: 0.5,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    Loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get(
        "https://finix-burger-default-rtdb.firebaseio.com/Ingredients%20.json"
      )
      .then((res) => {
        this.setState({ ingredeints: res.data });
      }).catch(error=>this.setState({error: true}));
  }
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
  purchasingHandler = () => {
    // const purchasing = this.state.purchasing
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.setState({ Loading: true });
    const order = {
      ingredeint: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "ifeanyi",
        address: {
          street: "yelwa",
          zipcode: "24554",
          country: "Nigeria",
        },
        deliveryMethod: "Fastest",
      },
    };
    axios
      .post("/orders.json", order)
      .then((responese) => this.setState({ Loading: false, purchasing: false }))
      .catch((error) => this.setState({ Loading: false, purchasing: false }));
  };
  render() {
    const disabledInfor = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfor) {
      disabledInfor[key] = disabledInfor[key] <= 0;
    }
    let orderSummary = null
   
  
    let burger = this.state.error? <p>ingredeint not loading</p>: <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
      if (this.state.Loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
export default withErrorHandler(BurgerBuilder, axios);
