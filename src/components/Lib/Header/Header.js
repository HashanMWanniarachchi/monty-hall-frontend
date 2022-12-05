import classes from "./Header.module.css";

/**
 * @typedef {Object} props
 * @property {string} text - Text of the header
 */

/**
 * Represents a header element, in a generalized manner
 * @param {props} props Configuration object for header
 * @returns Customized header according to props values
 */

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>{props.text}</h1>
    </header>
  );
};

export default Header;
