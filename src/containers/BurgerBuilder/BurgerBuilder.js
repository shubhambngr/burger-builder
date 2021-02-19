import { PureComponent } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends PureComponent {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    document.title = "MyBurger";
    this.props.onInitIngs();
  }

  orderDisabledHandler(ings) {
    let totalIngs = 0;
    Object.keys(ings).map((igKey) => (totalIngs += ings[igKey]));
    return totalIngs > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // disabledInfo = {"salad": true, "meat": false, ...}
    }

    const orderSummary = this.props.ings ? (
      <OrderSummary
        ingredients={this.props.ings}
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}
        price={this.props.price}
      />
    ) : null;

    const burger = this.props.error ? (
      <>
        <h2>Error!</h2>
        <p>Couldn't load page. Please try again.</p>
      </>
    ) : this.props.ings !== null ? (
      <>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          addClicked={this.props.onIngAdd}
          removeClicked={this.props.onIngRemove}
          disabled={disabledInfo}
          price={this.props.price}
          orderDisabled={this.orderDisabledHandler(this.props.ings)}
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

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngAdd: (name) => dispatch(actions.addIng(name)),
    onIngRemove: (name) => dispatch(actions.removeIng(name)),
    onInitIngs: () => dispatch(actions.initIngs()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
