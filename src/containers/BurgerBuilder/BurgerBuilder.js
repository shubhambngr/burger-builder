import { Component } from "react";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
  salad: 0.25,
  cheese: 0.5,
  meat: 1.4,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://myburger-97d2b-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => this.setState({ ingredients: { ...response.data } }))
      .catch((err) => this.setState({ error: err }));
  }

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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // disabledInfo = {"salad": true, "meat": false, ...}
    }

    const orderSummary = this.state.ingredients ? (
      this.state.loading ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      )
    ) : null;

    const burger = this.state.error ? (
      <>
        <h2>Error!</h2>
        <p>Couldn't load page. Please try again.</p>
      </>
    ) : this.state.ingredients ? (
      <>
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
    ) : (
      <Spinner />
    );

    return (
      <>
        <Modal
          show={this.state.purchasing}
          backdropClicked={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
