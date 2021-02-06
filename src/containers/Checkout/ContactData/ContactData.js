import { Component } from "react";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  formElConfig = (el, elementType, elPlaceholder, minLen, maxLen) => {
    let config = null;
    if (el === "input") {
      config = {
        elType: el,
        elConfig: {
          type: elementType,
          placeholder: elPlaceholder,
        },
        value: "",
        validation: {
          required: true,
          minLength: minLen,
          maxLength: maxLen,
        },
        valid: false,
        touched: false,
      };
    } else if (el === "select") {
      config = {
        elType: el,
        elConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      };
    }
    return config;
  };

  state = {
    orderForm: {
      name: this.formElConfig("input", "text", "Name"),
      email: this.formElConfig("input", "email", "Email"),
      street: this.formElConfig("input", "text", "Street"),
      zip: this.formElConfig("input", "text", "Zip Code", 6, 6),
      country: this.formElConfig("input", "text", "Country"),
      delivery: this.formElConfig("select"),
    },
    formIsValid: false,
    loading: false,
  };

  // componentDidMount() {
  //   console.log(this.state.orderForm);
  // }

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
      ingredients: { ...this.props.ingredients },
      price: Number(this.props.price).toFixed(2),
      orderData: formData,
    };
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.replace("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.props.history.replace("/");
      });
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

    if (this.state.loading === true) {
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

export default ContactData;
