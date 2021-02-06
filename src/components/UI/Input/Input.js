import styles from "./Input.module.css";

function Input(props) {
  let inputEl = null;

  switch (props.elType) {
    case "input":
      inputEl = (
        <input
          {...props.elConfig}
          className={`${styles.Input} ${
            props.invalid && props.touched && styles.Invalid
          }`}
          value={props.value}
          onChange={props.handleChange}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          {...props.elConfig}
          className={`${styles.Input} ${
            props.invalid && props.touched && styles.Invalid
          }`}
          value={props.value}
          onChange={props.handleChange}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={styles.Input}
          value={props.value}
          onChange={props.handleChange}
        >
          {props.elConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          {...props.elConfig}
          className={`${styles.Input} ${
            props.invalid && props.touched && styles.Invalid
          }`}
          value={props.value}
          onChange={props.handleChange}
        />
      );
  }

  return (
    <div className={styles.InputWrapper}>
      {inputEl}
      {props.invalid && props.touched && (
        <p style={{ marginBottom: "0" }}>Please enter a valid value!</p>
      )}
    </div>
  );
}

export default Input;
