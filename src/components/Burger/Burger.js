import styles from "./Burger.module.css";
import Ingredient from "./Ingredients/Ingredient";

const Burger = (props) => {
  let finalIngs = [];
  Object.keys(props.ingredients).map((ingKey) => {
    Array(props.ingredients[ingKey])
      .fill(ingKey)
      .map((item) =>
        finalIngs.push(<Ingredient type={item} key={Math.random()} />)
      );
    return null;
  });

  finalIngs.length === 0 &&
    (finalIngs = <p>Please start adding ingredients.</p>);

  return (
    <div className={styles.burger}>
      <Ingredient type="bread-top" />
      {finalIngs}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
