import { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //  * This can be a functional component
  // componentDidUpdate() {
  //   console.log("[orderSummary] componentDidUpdate");
  // }

  render() {
    const ingSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <>
        <h3>Your Order</h3>
        <p>
          Do you want to order your burger containing the following ingredients:{" "}
        </p>
        <ul>{ingSummary}</ul>
        <p>
          <strong>Total Price: $ {this.props.price.toFixed(2)}</strong>
        </p>
        <Button type="Danger" onClick={this.props.cancelPurchase}>
          CANCEL
        </Button>
        <Button type="Success" onClick={this.props.continuePurchase}>
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
