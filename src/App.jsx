import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function checkWinningCondition(gameBoard) {
  let winner = null;
  for (let combination of WINNING_COMBINATIONS) {
    let blockOne = gameBoard[combination[0].row][combination[0].column];
    let blockTwo = gameBoard[combination[1].row][combination[1].column];
    let blockThree = gameBoard[combination[2].row][combination[2].column];

    if (
      blockOne !== null &&
      blockOne === blockTwo &&
      blockOne === blockThree &&
      blockOne
    ) {
      winner = blockOne;
    }
  }

  return winner;
}

function pupulateGameBoard(turns, gameBoard) {
  for (let turn of turns) {
    const { blockLocation, player } = turn;
    const { row, col } = blockLocation;

    gameBoard[row][col] = player;
  }
}

function initialize(turns) {
  let winner = null;
  let gameBoard = structuredClone(initialGameBoard);

  let player = "X";
  if (turns.length > 0 && turns[0].player === "X") player = "O";

  return { winner, gameBoard, player };
}

function App() {
  // turns = [
  //   {
  //     blockLocation: {row: i, col: j},
  //     player: name
  //   }, ...
  // ]

  const [turns, setTurns] = useState([]);
  const [playerData, setPlayerData] = useState(PLAYERS);

  let { winner, gameBoard, player } = initialize(turns);

  function handlePlayerAlias(symbol, name) {
    console.log("previous player data: ", playerData);
    setPlayerData(() => {
      let playerDataCopy = structuredClone(playerData);
      playerDataCopy[symbol] = name;

      console.log("new player data: ", playerDataCopy);

      return playerDataCopy;
    });
  }

  pupulateGameBoard(turns, gameBoard);

  winner = checkWinningCondition(gameBoard);

  function handlePlayer(rowIndex, colIndex) {
    setTurns((tilPrevTurns) => {
      let updatedTurns = [
        {
          blockLocation: { row: rowIndex, col: colIndex },
          player: player,
        },
        ...tilPrevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name={PLAYERS.X}
              symbol="X"
              isActive={player === "X"}
              handlePlayerAlias={handlePlayerAlias}
            />
            <Player
              name={PLAYERS.O}
              symbol="O"
              isActive={player === "O"}
              handlePlayerAlias={handlePlayerAlias}
            />
          </ol>
          {winner !== null || turns.length === 9 ? (
            <GameOver
              winner={winner !== null ? playerData[winner] : null}
              onRematch={() => setTurns([])}
            />
          ) : null}
          <GameBoard handlePlayer={handlePlayer} gameBoard={gameBoard} />
        </div>
        <Log turns={turns} />
      </main>
    </>
  );
}

export default App;
