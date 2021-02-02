import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

function CheckoutSummary(props) {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes good!</h1>
      <div
        className={styles.BurgerWrapper}
        style={{ width: "100%", margin: "auto" }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" onClick={props.checkoutCancelledHandler}>
        CANCEL
      </Button>
      <Button type="Success" onClick={props.checkoutContinuedHandler}>
        CONTINUE
      </Button>
    </div>
  );
}

export default CheckoutSummary;
