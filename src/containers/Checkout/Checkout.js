import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  render() {
    const purchaseRedirect = this.props.purchased && <Redirect to="/" />;
    const summary = this.props.ings ? (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          checkoutCancelledHandler={() => this.props.history.replace("/")}
          checkoutContinuedHandler={() =>
            this.props.history.push(`/checkout/contact-data`)
          }
          ingredients={this.props.ings}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
        />
      </div>
    ) : (
      <Redirect to="/" />
    );
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
