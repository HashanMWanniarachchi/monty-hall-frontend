import classes from "./Card.module.css";

/**
 * @typedef {Object} props
 * @property {string} className - Additional class(es) for Card element
 */

/**
 * Represents a visual element with some styling
 * @param {props} props Configuration object for card element
 * @returns a visual element with some styling
 */

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
