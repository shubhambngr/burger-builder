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

// * Line (5-11) / creating finalIngs and adding ingredients dynamically to burger.
// finalIngs stores the Ingredient els for every ing type.
// ! for loop gave no-loop-func error which can be unstable so replaced it with Object.keys()
// for loop iterates through the object and assigns the name ing-amount to every key-value in that iteration.
// Object.keys() creates an array of the keys from the object.
// keys().map() iterates through the array of keys and uses them to find the value of that key.
// Array(amount).fill(var) creates an anon array with [amount] entries of [var].
// map will go through the anon arr and create <Ingredient /> for every item in anon arr and push it to finalIngs.

// * Instead of mapping twice, this part is executed in map func with <Ingredient /> (Line: 15)
// const finalIngs = ingsArray.map((ing, index) => (
//   <Ingredient type={ing} key={index} />
// ));

// !DON'T USE. TOO MUCH CODE.
// * Another (and kinda old/boring) Way of creating array with (ings * their_amount).

// const ingsArray = [];
// Object.keys(props.ingredients).map((ingredient) =>
//   `${ingredient} `
//     .repeat(props.ingredients[ingredient])
//     .split(" ")
//     .filter((item) => item !== "")
//     .map((ing) => ingsArray.push(ing))
// );

// const finalIngs = ingsArray.map((ing) => (
//   <Ingredient type={ing} key={ing + Math.random()} />
// ));
