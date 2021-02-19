import { Component } from "react";
import { connect } from "react-redux";

import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import formElConfig from "./formElConfig";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: formElConfig("input", "text", "Name"),
      email: formElConfig("input", "email", "Email"),
      street: formElConfig("input", "text", "Street"),
      zip: formElConfig("input", "text", "Zip Code", 4, 6),
      country: formElConfig("input", "text", "Country"),
      delivery: formElConfig("select"),
    },
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
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
    };
    this.props.onBurgerPurchase(orderData);
  };

  handleInputChange = (event, element) => {
    const newOrderForm = { ...this.state.orderForm };
    const newElement = { ...newOrderForm[element] };
    newElement.value = event.target.value;
    newElement.valid = this.checkValidity(
      newElement.value,
      newElement.validation
    );
    newElement.touched = true;
    newOrderForm[element] = newElement;

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerPurchase: (data) => dispatch(actions.purchaseBurger(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
