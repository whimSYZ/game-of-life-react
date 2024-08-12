import React, { useState, useEffect } from "react";
import Cell from "./Cell.tsx";

// Define the type for the grid
type Grid = boolean[][];
type GameOfLifeProps = {
    numRows?: number, 
    numCols?: number, 
    density?: number,
    interval?: number
}

const initGrid = (numRows, numCols, density): Grid => {
  return Array(numRows).fill(0).map(() => Array(numCols).fill(0).map(() => Math.random() < density));
};

export default function GameOfLife({
    numRows= 20,
    numCols= 40,
    density= 0.2,
    interval= 1000
}: GameOfLifeProps) {
  const [grid, setGrid] = useState<Grid>(initGrid(numRows, numCols, density));

  const runSimulation = () => {
    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = [
            [i - 1, j - 1],
            [i - 1, j],
            [i - 1, j + 1],
            [i, j - 1],
            [i, j + 1],
            [i + 1, j - 1],
            [i + 1, j],
            [i + 1, j + 1],
          ];

          let liveNeighbors = 0;
          neighbors.forEach(([x, y]) => {
            if (x >= 0 && x < numRows && y >= 0 && y < numCols && g[x][y]) {
              liveNeighbors += 1;
            }
          });

          if (cell && (liveNeighbors < 2 || liveNeighbors > 3)) {
            return false;
          }
        
          if (!cell && liveNeighbors === 3) {
            return true;
          }
          return cell;
        })
      );
    });
  };

  useEffect(() => {
    const intervalId = setInterval(runSimulation, interval);
    return () => clearInterval(intervalId);
  }, [runSimulation])

  const toggleCellState = (row: number, col: number) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell))
    );
    setGrid(newGrid);
  };

  return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              isAlive={cell}
              toggleCell={() => toggleCellState(i, j)}
            />
          ))
        )}
      </div>
  );
};
