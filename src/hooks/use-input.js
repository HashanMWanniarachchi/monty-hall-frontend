import { useState } from "react";

/**
 * @typedef {Object} InputHookReturn
 * @property {any} value - Value of the input; type depends on the used input type
 * @property {boolean} isValid - If value adheres to the validation logic
 * @property {boolean} hasError - If input is in error state
 * @property {Function} valueChangeHandler - Change handler function for input
 * @property {Function} inputBlurHandler - Blur handler function for input
 */

/**
 * Represents a custom hook for input validation
 * @param {Function} validateValue A validation function for the input
 * @returns {InputHookReturn} An interface for the input
 */

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = isTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
