import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

const BuildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>$ {props.price.toFixed(2)}</strong>
      </p>
      {controls.map((item) => (
        <BuildControl
          key={item.label}
          label={item.label}
          addIngs={() => props.addClicked(item.type)}
          removeIngs={() => props.removeClicked(item.type)}
          disabled={props.disabled[item.type]}
        />
      ))}
      <button
        className={styles.OrderButton}
        disabled={!props.orderDisabled}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
