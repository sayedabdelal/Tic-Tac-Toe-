import { useState } from "react"
import Player from "./component/Player"
import GameBoard from "./component/GameBoard"
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations.js";
import GameOver from "./component/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];



function deriveActivePlayer(gameTurns){
  
  let currActivePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currActivePlayer = 'O';
  }
  return currActivePlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secendSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secendSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      break;
    }

  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard].map(array=> [...array]);

  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {

  const [players, setPlayers] = useState({
    'X': 'Player1',
    'O': 'Player2'
  })
  //  Each move is stored as an object with the row, column, and player who made the move.
  const [gameTurns, setgameTurns] = useState([]);
 

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;



  function handleSelectSquare(rowIndex, colIndex) {
  
    setgameTurns((prevTurns)=> {
      const currentPlayer = deriveActivePlayer(gameTurns);

      let currActivePlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currActivePlayer = 'O';
      }
      const updateTurns = [
        {square: {row: rowIndex, col: colIndex},  player: currentPlayer },
        ...prevTurns,
      ];

    

      return updateTurns;
    })
  }


  function handleRestart() {
    setgameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) { 
    setPlayers(
      prevPlayers => {
        return {
          ...prevPlayers,
          [symbol]: newName
        }
      }
    )
  }

  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player initalName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName= {handlePlayerNameChange}/>
              <Player initalName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName= {handlePlayerNameChange}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
            <GameBoard 
              onSelectSquare={handleSelectSquare}  
              board = {gameBoard}
            />
        </div>
        <Log  turns = {gameTurns}/>
      </main>
  )
}

export default App
