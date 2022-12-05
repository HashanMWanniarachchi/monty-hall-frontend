# Monty Hall Simulation

This project will simulate and show results for the popular 'Monty Hall' game show. Users can input number of games that need to be simulated, along with the decision that if participant would switch the selection to the remaining door after the reveal.

After getting simulation results through a separate `.NET Web API`, it will be displayed, where users can see how many games were won based on the participant's decision to switch the doors(or not).

## Running the project

1. Install dependencies : `npm install`
2. Run the project : `npm start`

**IMPORTANT! \
If the project is running on a port other than 3000, please change the cors settings in the `startup.cs` file of the `MontyHallAPI` project to reflect the correct port**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
