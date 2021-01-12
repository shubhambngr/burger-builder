import { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICE = {
  salad: 0.25,
  cheese: 0.5,
  meat: 1.4,
  bacon: 0.7,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
  };

  orderDisabledHandler(ings) {
    let sum = 0;
    Object.keys(ings).map((igKey) => (sum += ings[igKey]));
    this.setState({ purchasable: sum !== 0 });
  }

  addIngredientHandler = (type) => {
    const ings = { ...this.state.ingredients };
    ings[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.setState({ ingredients: ings, totalPrice: newPrice });
    this.orderDisabledHandler(ings);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const ings = { ...this.state.ingredients };
    ings[type] = this.state.ingredients[type] - 1;
    const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
    this.setState({ ingredients: ings, totalPrice: newPrice });
    this.orderDisabledHandler(ings);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You continued!");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // disabledInfo = {"salad": true, "meat": false, ...}
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          backdropClicked={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addClicked={this.addIngredientHandler}
          removeClicked={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          orderDisabled={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </>
    );
  }
}
