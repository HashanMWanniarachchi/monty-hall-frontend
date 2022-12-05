import { Fragment } from "react";
import { useQuery } from "react-query";

import Header from "../Lib/Header/Header";
import Input from "../Lib/Input/Input";
import Select from "../Lib/Select/Select";
import SimulationResult from "./SimulationResults";

import useInput from "../../hooks/use-input";
import useSelect from "../../hooks/use-select";

import { simulateGames } from "../../services/MontyHallSimulationAPI";

import classes from "./SimulationForm.module.css";

const SimulationForm = () => {
  //Get interface for the input element used for the number of games
  const {
    value: numberOfGames,
    isValid: numberOfGamesIsValid,
    hasError: numberOfGamesHasError,
    valueChangeHandler: numberOfGamesChangeHandler,
    inputBlurHandler: numberOfGamesBlurHandler,
  } = useInput((value) => {
    return value.trim().length > 0 && +value > 0;
  });

  //Get interface for the select used for the switch decision
  const {
    value: shouldSwitch,
    isValid: shouldSwitchIsValid,
    valueChangeHandler: shouldSwitchChangeHandler,
  } = useSelect();

  //options for the select element
  const selectOptions = [
    { value: "", text: "Select switch option" },
    { value: true, text: "Switch" },
    { value: false, text: "Don't switch" },
  ];

  //check form state, based on values of input and select elements
  let formIsValid = numberOfGamesIsValid && shouldSwitchIsValid;

  /*Get interface for the useQuery for the query execution. this provides us with usable information for the query state
  and also provides methods for manual invocation, while returning data from the query*/
  const {
    isLoading: isSimulationLoading,
    error: isSimulationError,
    data: simulationData,
    isSuccess: isSimulationSuccess,
    refetch: refetchSimulationResults,
    isRefetching: isSimulationFetching,
    isRefetchError: isSimulationFetchingError,
  } = useQuery(
    ["simulation", numberOfGames, shouldSwitch],
    () => simulateGames(numberOfGames, shouldSwitch),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 0,
      retry: false,
    }
  );

  //Handle fom submit, and get the simulated results
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    refetchSimulationResults();
  };

  //Show appropriate content based on query state(isSimulationLoading, isSimulationError, isSimulationSuccess, etc.)
  let resultContent = "";

  if (isSimulationLoading || isSimulationFetching) {
    resultContent = <p>Simulating the results...</p>;
  }

  if (isSimulationError || isSimulationFetchingError) {
    resultContent = <p role="simulationErrorText">Error simulating the game</p>;
  }

  if (isSimulationSuccess) {
    resultContent = <SimulationResult simulation={simulationData} />;
  }

  return (
    <Fragment>
      <div className={classes.Form}>
        <form onSubmit={onSubmitHandler}>
          <Header text="Monty Hall Simulation" />
          <Input
            type="number"
            label="Number of games"
            id="numberOfGames"
            onChange={numberOfGamesChangeHandler}
            onBlur={numberOfGamesBlurHandler}
            validateFailMessage="Please enter a number greater than zero"
            hasError={numberOfGamesHasError}
          />
          <Select
            label="Switch selection after reveal?"
            options={selectOptions}
            id="shouldSwitch"
            onChange={shouldSwitchChangeHandler}
          />
          <Input isValid={formIsValid} type="submit" value="Simulate" />
        </form>
      </div>
      {resultContent}
    </Fragment>
  );
};

export default SimulationForm;
