import React, { useCallback } from 'react';
import { CellType } from '../../containers/GameOfLife';
import { CellWrap } from "./styles";

interface CellProps { 
  indexCol: number,
  indexRow: number,
  grid: CellType[][],
  setGrid: (g: CellType[][]) => void,
  value: boolean,
  activeCell: number
  setActiveCell: (n: number) => void
};

function Cell({ indexCol, indexRow, grid, setGrid, value, setActiveCell, activeCell }: CellProps) {
  const handleClick = useCallback(() => {
    const newGrid = [...grid]
    newGrid[indexRow][indexCol].value = !newGrid[indexRow][indexCol].value;
    setGrid(newGrid);
    setActiveCell(activeCell + 1);
  }, [setGrid, grid, indexRow, indexCol, setActiveCell, activeCell])

  return (
    <CellWrap 
      key={indexCol}
      onClick={handleClick}
      value={value}
    />
  );
}

export default Cell;
