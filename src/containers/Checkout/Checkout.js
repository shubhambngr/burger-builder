import { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ings = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] !== "price") {
        ings[param[0]] = +param[1];
      } else {
        price = param[1];
      }
    }
    this.setState({ ingredients: ings, totalPrice: price });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelledHandler={() => this.props.history.replace("/")}
          checkoutContinuedHandler={() =>
            this.props.history.push(`/checkout/contact-data`)
          }
          ingredients={this.state.ingredients}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
