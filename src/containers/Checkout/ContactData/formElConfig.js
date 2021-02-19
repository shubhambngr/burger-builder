const formElConfig = (el, elementType, elPlaceholder, minLen, maxLen) => {
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

export default formElConfig;
