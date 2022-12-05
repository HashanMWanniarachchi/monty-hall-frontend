import classes from "./Input.module.css";

/**
 * @typedef {Object} props
 * @property {string} type - Type of the input
 * @property {string} label - Label text for the input
 * @property {string} id - Unique identifier for the input
 * @property {string} dataType - Data-type attribute value for input. Used for testing purposes
 * @property {any} value - Value of input; type depends on the defined input type
 * @property {Function} onChange - Change handler function for input
 * @property {Function} onBlur - Blur handler function for input
 * @property {boolean} isValid - Valid state for the input
 * @property {boolean} validateFailMessage - A string to be displayed if input is invalid
 */

/**
 * Represents an input element in the form, in a generalized manner
 * @param {props} props The configuration object
 * @returns customized input according to props values
 */

const Input = (props) => {
  return (
    <div className={classes.controlWrapper}>
      <div
        className={`${classes.control} ${
          props.hasError && props.type !== "submit" ? classes.invalid : ""
        }`}
      >
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <input
          className={`${props.type === "submit" ? classes.button : ""}`}
          type={props.type}
          data-type={props.dataType}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          disabled={props.type === "submit" && !props.isValid}
        />
      </div>
      {props.type !== "submit" && props.hasError && (
        <p className={classes.error}>{props.validateFailMessage}</p>
      )}
    </div>
  );
};

export default Input;
