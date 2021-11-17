import { useCallback, useState } from 'react';
import { CellType } from '../containers/GameOfLife';

interface UseGameOfLifeProps { 
  row: number,
  col: number,
  initialValues?: CellType[][],
  setActiveCell: (n: number) => void,
};

interface UseGameOfLifeDataReturned { 
  gameOfLifeLogicStart: (grid?: CellType[][]) => void,
  grid?: CellType[][],
  setInitialGrid: () => void,
  setGrid: (v: CellType[][]) => void,
};

type UseGameOfLifeType = ({ row, col }: UseGameOfLifeProps) => UseGameOfLifeDataReturned;

const calcIndex = (index: number, row: number) => {
  // repliacate infinite grid quando arriva a fine griglia appare dalla parte opposta
  return ((index % row) + row) % row;
  // finite grid si blocca ma con alcuni problemi...
  // if (index && index <= row) return index;
  // return null;
}

const useGameOfLife: UseGameOfLifeType = ({ row, col, initialValues, setActiveCell }) => {
  const [grid, setGrid] = useState<CellType[][]>()

  // Set Empty Grid
  const setInitialGrid = useCallback(() => {
    const matrix = initialValues || Array(row)
      .fill(Array(col)
      .fill({value: false}))
      .map((el, indexRow) => 
        el.map((el: any, indexCol: number) => ({...el, indexRow, indexCol}))
      );
      setGrid(matrix);
  }, [row, col, setGrid, initialValues])

  const getCell = useCallback(({ col, row, grid }) => {
    if(row >= 0 && col >= 0)
      return grid[row]?.[col]?.value
    return null
  }, [])

  // Count the neighbors active cells
  const countNeighborsCell = useCallback((cell: CellType, grid: CellType[][]) => {
    const rowPrev = calcIndex(cell.indexRow - 1, row);
    const rowNext = calcIndex(cell.indexRow + 1, row);
    const colPrev = calcIndex(cell.indexCol - 1, col);
    const colNext = calcIndex(cell.indexCol + 1, col);

    const right = getCell({ row: rowNext, col: cell.indexCol, grid });
    const left = getCell({ row: rowPrev, col: cell.indexCol, grid });
    const down = getCell({ row: cell.indexRow, col: colNext, grid });
    const up = getCell({ row: cell.indexRow, col: colPrev, grid });
    const upLeft = getCell({ row: rowPrev, col: colPrev, grid });
    const upRight = getCell({ row: rowPrev, col: colNext, grid });
    const downLeft = getCell({ row: rowNext, col: colPrev, grid });
    const downRight = getCell({ row: rowNext, col: colNext, grid });
    
    const countNeighbors = [
      right,
      left,
      down,
      up,
      upLeft,
      upRight,
      downLeft,
      downRight,
    ].filter(x => !!x).length;

    return countNeighbors;
  }, [row, col, getCell])

  // Game start!
  const gameOfLifeLogicStart = useCallback((grid?: CellType[][]) => {
    let activeCellCount = 0;
    if(grid) {
      const newGrid = grid.map((row) => 
        row.map((cell: any) => {
          const neighbors = countNeighborsCell(cell, grid);
          // count ActiveCell
          if (cell.value) activeCellCount++;
          // logic for active or disactive cell
          if (cell.value && neighbors < 2) {
            return ({ ...cell, value: false });
          } 
          if (cell.value && neighbors < 4) {
            return ({ ...cell, value: true });
          } 
          if (!cell.value && neighbors === 3) {
            return ({ ...cell, value: true });
          } 
          return ({  ...cell, value: false });
        })
      );
      
      setGrid(newGrid);
      setActiveCell(activeCellCount);
    }
  }, [countNeighborsCell, setActiveCell])

  return { 
    gameOfLifeLogicStart,
    grid,
    setInitialGrid,
    setGrid,
  };
}

export default useGameOfLife;
