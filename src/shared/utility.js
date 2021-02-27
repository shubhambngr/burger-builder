export const updateObject = (oldObject, changes) => {
  return {
    ...oldObject,
    ...changes,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const formElConfig = (
  el,
  elementType,
  elPlaceholder,
  minLen,
  maxLen,
  isEmail
) => {
  let config = null;
  if (el === "input") {
    config = {
      elType: el,
      elConfig: {
        type: elementType,
        placeholder: elPlaceholder,
      },
      value: "",
      validation: {
        required: true,
        isEmail: isEmail,
        minLength: minLen,
        maxLength: maxLen,
      },
      valid: false,
      touched: false,
    };
  } else if (el === "select") {
    config = {
      elType: el,
      elConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    };
  }
  return config;
};
