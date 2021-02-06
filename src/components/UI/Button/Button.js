import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`${styles.Button} ${styles[props.type]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
