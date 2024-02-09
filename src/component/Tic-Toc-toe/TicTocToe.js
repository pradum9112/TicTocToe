import React, { useState, useEffect } from "react";

function TicTacToe() {
  const initialBoard = Array(9).fill(null);

  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem("board");
    return savedBoard ? JSON.parse(savedBoard) : initialBoard;
  });

  const [isXNext, setIsXNext] = useState(() => {
    const savedIsXNext = localStorage.getItem("isXNext");
    return savedIsXNext ? JSON.parse(savedIsXNext) : true;
  });

  const [winner, setWinner] = useState(() => {
    const savedWinner = localStorage.getItem("winner");
    return savedWinner ? JSON.parse(savedWinner) : null;
  });

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("isXNext", JSON.stringify(isXNext));
    localStorage.setItem("winner", JSON.stringify(winner));
  }, [board, isXNext, winner]);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const calculateWinner = (squares) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setIsXNext(true);
  };

  const handleResetClick = () => {
    resetGame();
  };

  const renderSquare = (i) => {
    const squareValue = board[i];

    const textColorStyle = {
      color:
        squareValue === "X" ? "red" : squareValue === "O" ? "blue" : "black",
    };

    return (
      <button
        className="btn btn-light square mx-1 my-1"
        onClick={() => handleClick(i)}
        style={{ width: "50px", height: "50px", ...textColorStyle }}
      >
        {board[i]}
      </button>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return <span className="text-success">{`${winner} wins!`}</span>;
    } else if (board.every((square) => square !== null)) {
      return (
        <span className="text-info">{"It's a draw! Reset to play again!"}</span>
      );
    } else {
      return (
        <span className="text-warning">{`Current player : ${
          isXNext ? " X" : " O"
        }`}</span>
      );
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Tic Tac Toe</h2>
              <div className="status text-center mb-3">{renderStatus()}</div>
              <div className="board text-center">
                <div className="board-row">
                  {renderSquare(0)}
                  {renderSquare(1)}
                  {renderSquare(2)}
                </div>
                <div className="board-row">
                  {renderSquare(3)}
                  {renderSquare(4)}
                  {renderSquare(5)}
                </div>
                <div className="board-row">
                  {renderSquare(6)}
                  {renderSquare(7)}
                  {renderSquare(8)}
                </div>
              </div>

              <div className="text-center my-3">
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleResetClick}
                >
                  Reset Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
