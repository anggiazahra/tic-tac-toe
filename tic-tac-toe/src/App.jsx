import { useState } from 'react'

// eslint-disable-next-line react/prop-types
function Square({value, onSquareClick}) {
  if (value == 'X') {
  return <button className="square square-x" onClick={onSquareClick}>
    { value }
  </button>
  } else {
    return <button className="square square-o" onClick={onSquareClick}>
      { value }
    </button>
    }
}

// eslint-disable-next-line react/prop-types
function ButtonReset({onResetClick}) {
  return <button className="btn-reset" onClick={onResetClick}>
    Reset
  </button>
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
        
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status = '';
  if (winner) {
    status = 'Winner : ' + winner;
  } else {
    status = 'Next Player : ' + (xIsNext ? 'X' : 'O');
  }

  function reset() {
    const resetSquares = Array(9).fill(null);
    setSquares(resetSquares);
  }
  
  
  return (
    <>
      <div className='card'>
        <p className='status'>{status}</p>
        <div className='board'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <ButtonReset onResetClick={reset}/>
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i=0; i < lines.length; i++) {
    // const [a, b, c] = lines[i];
    const a = lines[i][0];
    const b = lines[i][1];
    const c = lines[i][2];

    
    if (squares[a] == squares[b]){
      if (squares[a] == squares[c]){
      return squares[a];
     }
    } 

  }
  return false;
}
