/**
 * @typedef {Object} SimulatedGame
 * @property {int} numberOfGames - Number of games sent to server
 * @property {boolean} shouldSwitch - Switch decision sent to server
 * @property {int} wins - Number of wins for the given game configuration
 */

/**
 * Represents a custom hook for input validation
 * @param {int} numberOfGames - Number of games to simulate
 * @param {boolean} shouldSwitch - Switch decision for the simulation
 * @returns {SimulatedGame} Return value from the server
 */

export async function simulateGames(numberOfGames, shouldSwitch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `https://localhost:44342/api/simulation?numberOfGames=${numberOfGames}&shouldSwitch=${shouldSwitch}`,
      requestOptions
    );

    return response.json();
  } catch (e) {
    throw new Error("Error getting simulation");
  }
}
