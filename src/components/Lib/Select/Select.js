import { useState } from "react";
import classes from "./Select.module.css";

/**
 * @typedef {Object} option
 * @property {string} value - value for the select option
 * @property {string} text - text for the select option
 */

/**
 * @typedef {Object} props
 * @property {option[]} options - Options array for the select
 * @property {string} label - Label text for the select
 * @property {string} id - Unique identifier for the select
 * @property {any} value - Value of select
 * @property {Function} onChange - Change handler function for select
 * @property {boolean} isValid - Valid state for the select
 */

/**
 * Represents an select element in the form, in a generalized manner
 * @param {props} props - The configuration object
 * @returns customized select according to props values
 */

const Select = (props) => {
  const [selected, setSelected] = useState(
    props.options && props.options.length > 0 ? props.options[0].value : null
  );

  const changeHandler = (event) => {
    setSelected(event.target.value);
    props.onChange(event);
  };

  return (
    <div className={classes.controlWrapper}>
      <div className={classes.control}>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <select
          className=""
          id={props.id}
          value={selected}
          onChange={changeHandler}
        >
          {props.options &&
            props.options.length > 0 &&
            props.options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.text}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
