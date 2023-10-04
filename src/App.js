import Square from './Components/Square';
import './App.css';
import { useEffect, useState } from 'react';
import {Pattern} from './Components/Pattern'
import WinnerScreen from './WinnerScreen';

function App() {
  const [board,setBoard]=useState(["","","","","","","","",""]);
  const[player,setPlayer]=useState("🔥")
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [wined, setWin] = useState(false);
  useEffect(()=>{
    checkIfTie()
    checkWin()
    if(player=="❌"){
      setPlayer("🔥")
    }
    else{
      setPlayer("❌")
    }
  },[board])
  useEffect(() => {
    if (result.state != "none") {
      setWin(true);
      
      // alert(`Game Finished! Winning Player: ${result.winner}`);
    }
  }, [result]);
  
  const handleClick=(square)=>{
    setBoard(
    board.map((value,index)=>{
      if (index===square && value===""){
        return player
      }
      return value;
    })
    );
    
  }
  const checkWin = () => {
    Pattern.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };
  const restartGame = () => {
    
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("🟡");
    setWin(false)
  };
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };


  return (
    <div className="App">
      <div className="board">
        <div className="title"><h1>Let's play <br />TIc-Tac_toe</h1></div>
        <div className="row">
     <Square chooseSquare={()=>{handleClick(0)}}
     value={board[0]}/>
     <Square chooseSquare={()=>{handleClick(1)}}
     value={board[1]}/>
     <Square chooseSquare={()=>{handleClick(2)}}
     value={board[2]}/>
     </div>
     <div className="row">
     <Square chooseSquare={()=>{handleClick(3)}}
     value={board[3]}/>
     <Square chooseSquare={()=>{handleClick(4)}}
     value={board[4]}/>
     <Square chooseSquare={()=>{handleClick(5)}}
     value={board[5]}/>

     </div>
     <div className="row">
     <Square chooseSquare={()=>{handleClick(6)}}
     value={board[6]}/>
     <Square chooseSquare={()=>{handleClick(7)}}
     value={board[7]}/>
     <Square chooseSquare={()=>{handleClick(8)}}
     value={board[8]}/>

     </div>
     </div>
     {wined ? <WinnerScreen restartGame={restartGame} playerWon={result.winner} /> : null}
    </div>
  );
}

export default App;
