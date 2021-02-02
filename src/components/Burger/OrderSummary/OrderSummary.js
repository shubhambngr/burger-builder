import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
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
        <strong>Total Price: $ {props.price.toFixed(2)}</strong>
      </p>
      <Button type="Danger" onClick={props.cancelPurchase}>
        CANCEL
      </Button>
      <Button type="Success" onClick={props.continuePurchase}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
