import styles from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName],
    });
  }

  const ingOutput = ingredients.map((ing) => (
    <span key={ing.name}>
      {ing.name} ({ing.amount})
    </span>
  ));

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p style={{ textTransform: "capitalize" }}>Delivery: {props.delivery}</p>
      <p>
        Price: <strong>USD {Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
