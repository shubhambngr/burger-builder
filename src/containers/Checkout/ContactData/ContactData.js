import { Component } from "react";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const orderData = {
      ingredients: { ...this.props.ingredients },
      price: Number(this.props.price).toFixed(2),
      customer: {
        name: "John Carter",
        address: {
          street: "TestExample1",
          zip: "300145",
          country: "Denmark",
        },
        email: "johncarter@testmail.com",
      },
      delivery: "fastest",
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

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="postal" placeholder="Your Postal Code" />
        <Button type="Success" onClick={this.orderHandler}>
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
