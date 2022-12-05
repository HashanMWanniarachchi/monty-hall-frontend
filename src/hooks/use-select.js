import { useState } from "react";

/**
 * @typedef {Object} SelectHookReturn
 * @property {any} value - Value of the select
 * @property {boolean} isValid - If value adheres to the validation logic
 * @property {Function} valueChangeHandler - Change handler function for input
 */

/**
 * Represents a custom hook for select
 * @returns {SelectHookReturn} An interface for the select
 */

const useSelect = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = isTouched && enteredValue !== "";

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    valueChangeHandler,
  };
};

export default useSelect;
