import { Component } from "react";
import { connect } from "react-redux";

import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import {
  updateObject,
  checkValidity,
  formElConfig,
} from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: formElConfig("input", "text", "Name"),
      email: formElConfig("input", "email", "Email", null, null, true),
      street: formElConfig("input", "text", "Street"),
      zip: formElConfig("input", "text", "Zip Code", 4, 6),
      country: formElConfig("input", "text", "Country"),
      delivery: formElConfig("select"),
    },
    formIsValid: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const orderData = {
      ingredients: { ...this.props.ings },
      price: Number(this.props.price).toFixed(2),
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onBurgerPurchase(orderData, this.props.token);
  };

  handleInputChange = (event, element) => {
    const newElement = updateObject(this.state.orderForm[element], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[element].validation
      ),
      touched: true,
    });
    const newOrderForm = updateObject(this.state.orderForm, {
      [element]: newElement,
    });

    let formValdity = true;
    for (let key in newOrderForm) {
      formValdity = newOrderForm[key].valid && formValdity;
    }

    this.setState({ orderForm: newOrderForm, formIsValid: formValdity });
  };

  render() {
    const formElsArray = [];
    for (let key in this.state.orderForm) {
      formElsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    const inputs = formElsArray.map((el) => (
      <Input
        key={el.id}
        value={el.config.value}
        handleChange={(event) => this.handleInputChange(event, el.id)}
        elType={el.config.elType}
        elConfig={el.config.elConfig}
        invalid={!el.config.valid}
        touched={el.config.touched}
      />
    ));

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputs}
        <Button type="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter Your Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerPurchase: (data, token) =>
      dispatch(actions.purchaseBurger(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
