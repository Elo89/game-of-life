import React, { useCallback } from 'react';
import { CellType } from '../../containers/GameOfLife';
import { CellWrap } from "./styles";

interface CellProps { 
  indexCol: number,
  indexRow: number,
  grid: CellType[][],
  setGrid: (g: CellType[][]) => void,
  value: boolean,
};

function Cell({ indexCol, indexRow, grid, setGrid, value }: CellProps) {
  const handleClick = useCallback(() => {
    const newGrid = [...grid]
    newGrid[indexRow][indexCol].value = !newGrid[indexRow][indexCol].value;
    setGrid(newGrid);
  }, [setGrid, grid, indexRow, indexCol])

  return (
    <CellWrap 
      key={indexCol}
      onClick={handleClick}
      value={value}
    />
  );
}

export default Cell;
