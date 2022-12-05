import Card from "../Lib/Card/Card";
import Header from "../Lib/Header/Header";
import classes from "./SimulationResults.module.css";

const SimulationResult = (props) => {
  return (
    <Card>
      <Header text="Simulation Results" />
      <div className={classes.container}>
        <div className={classes.innercontainer}>
          <h4>Number of games</h4>
          <span role="resultsNumberOfGames" className={classes.resultitem}>
            {props.simulation.numberOfGames}
          </span>
        </div>
        <div className={classes.innercontainer}>
          <h4>Switch after reveal?</h4>
          <span role="resultsShouldSwitch" className={classes.resultitem}>
            {props.simulation.shouldSwitch.toString()}
          </span>
        </div>

        <div className={classes.innercontainer}>
          <h4>Number of wins</h4>
          <span role="resultsWins" className={classes.resultitem}>
            {props.simulation.wins}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SimulationResult;
