import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import userEvent from "@testing-library/user-event";
import SimulationForm from "./SimulationForm";

const renderForm = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <SimulationForm />
    </QueryClientProvider>
  );
};

describe("SimulationForm component", () => {
  test("should render all form elements correctly", () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );
    const submitBtn = screen.getByRole("button");

    expect(numberOfGamesInput).toBeInTheDocument();
    expect(shouldSwitchSelect).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test("should show an error if number of games is set to zero", async () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    await userEvent.type(numberOfGamesInput, "0");

    await userEvent.tab();

    const errormsg = screen.getByText(
      "Please enter a number greater than zero"
    );

    expect(errormsg).toBeInTheDocument();
  });

  test("should show an error if number of games is set to a negative", async () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    await userEvent.type(numberOfGamesInput, "-1");

    await userEvent.tab();

    const errormsg = screen.getByText(
      "Please enter a number greater than zero"
    );

    expect(errormsg).toBeInTheDocument();
  });

  test("should show an error if user visited the Number of games field, but no value is provided", () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");

    fireEvent.focusIn(numberOfGamesInput);
    fireEvent.focusOut(numberOfGamesInput);

    const errorMessage = screen.getByText(
      "Please enter a number greater than zero"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should disable the submit button initially", () => {
    renderForm();

    const submitBtn = screen.getByRole("button");
    expect(submitBtn).toHaveAttribute("disabled");
  });

  test("should disable the button if Number of games has an invalid value", async () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );

    const submitBtn = screen.getByRole("button");

    await userEvent.type(numberOfGamesInput, "0");
    await userEvent.tab();

    shouldSwitchSelect.value = true;
    shouldSwitchSelect.dispatchEvent(new Event("change"));

    expect(submitBtn).toHaveAttribute("disabled");
  });

  test("should disable the button if Number of games is empty", async () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );

    const submitBtn = screen.getByRole("button");

    shouldSwitchSelect.value = true;
    shouldSwitchSelect.dispatchEvent(new Event("change"));

    fireEvent.focusIn(numberOfGamesInput);
    fireEvent.focusOut(numberOfGamesInput);

    expect(submitBtn).toHaveAttribute("disabled");
  });

  test("should disable the button if switch decision is not selected", async () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");

    const submitBtn = screen.getByRole("button");

    await userEvent.type(numberOfGamesInput, "100");

    await userEvent.tab();

    expect(submitBtn).toHaveAttribute("disabled");
  });

  test("should update the switch decision selector value based on the selected option", async () => {
    renderForm();

    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );

    await fireEvent.change(shouldSwitchSelect, { target: { value: "true" } });

    expect(shouldSwitchSelect.value).toBe("true");
  });

  test("should enable the button if both number of games and a switch decision is made", async () => {
    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );
    const submitBtn = screen.getByRole("button");

    await userEvent.type(numberOfGamesInput, "100");
    await userEvent.tab();

    await fireEvent.change(shouldSwitchSelect, { target: { value: "true" } });

    expect(submitBtn).not.toHaveAttribute("disabled");
  });

  test("should call fetch API once when the submit button is clicked", async () => {
    const dummySimulationResult = {
      numberOfGames: 100,
      shouldSwitch: true,
      wins: 66,
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummySimulationResult),
      })
    );
    global.fetch = fetchMock;

    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );
    const submitBtn = screen.getByRole("button");

    await userEvent.type(numberOfGamesInput, "100");
    await userEvent.tab();

    await fireEvent.change(shouldSwitchSelect, { target: { value: "true" } });

    await userEvent.click(submitBtn);

    expect(fetchMock).toBeCalledTimes(1);
  });

  test("should show results when data is fetched", async () => {
    const dummySimulationResult = {
      numberOfGames: 100,
      shouldSwitch: true,
      wins: 66,
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummySimulationResult),
      })
    );
    global.fetch = fetchMock;

    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );
    const submitBtn = screen.getByRole("button");

    await userEvent.type(numberOfGamesInput, "100");
    await userEvent.tab();

    await fireEvent.change(shouldSwitchSelect, { target: { value: "true" } });

    await userEvent.click(submitBtn);

    expect(fetchMock).toBeCalledTimes(1);

    const resultsHeader = await screen.findByText("Simulation Results");
    const resultsNumberOfGames = await screen.findByRole(
      "resultsNumberOfGames"
    );
    const resultsShouldSwitch = await screen.findByRole("resultsShouldSwitch");
    const resultsWins = await screen.findByRole("resultsWins");

    expect(resultsHeader).toBeInTheDocument();

    expect(resultsNumberOfGames).toBeInTheDocument();
    expect(resultsNumberOfGames).toHaveTextContent("100");

    expect(resultsShouldSwitch).toBeInTheDocument();
    expect(resultsShouldSwitch).toHaveTextContent("true");

    expect(resultsWins).toBeInTheDocument();
    expect(resultsWins).toHaveTextContent("66");
  });

  test("should show error message when data cannot be fetched", async () => {
    const fetchMock = jest.fn(() => Promise.reject("failed"));
    global.fetch = fetchMock;

    renderForm();

    const numberOfGamesInput = screen.getByLabelText("Number of games");
    const shouldSwitchSelect = screen.getByLabelText(
      "Switch selection after reveal?"
    );
    const submitBtn = screen.getByRole("button");

    await userEvent.type(numberOfGamesInput, "100");
    await userEvent.tab();

    await fireEvent.change(shouldSwitchSelect, { target: { value: "true" } });

    await userEvent.click(submitBtn);

    const simulationError = await screen.findByRole("simulationErrorText");

    expect(simulationError).toBeInTheDocument();
  });
});
