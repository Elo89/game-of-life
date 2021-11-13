import { useCallback, useState } from 'react';
import { CellType } from '../containers/GameOfLife';

interface UseGameOfLifeProps { dimension: number };

interface UseGameOfLifeDataReturned { 
  gameOfLifeLogicStart: (grid?: CellType[][]) => void,
  grid?: CellType[][],
  setInitialGrid: () => void,
  setGrid: (v: CellType[][]) => void,
};

type UseGameOfLifeType = ({ dimension }: UseGameOfLifeProps) => UseGameOfLifeDataReturned;

const calcIndex = (n: number, m: number) => {
  return ((n % m) + m) % m;
}

const useGameOfLife: UseGameOfLifeType = ({ dimension }) => {
  const [grid, setGrid] = useState<CellType[][]>()

  // Set Empty Grid
  const setInitialGrid = useCallback(() => {
    const matrix = Array(dimension)
      .fill(Array(dimension)
      .fill({value: false}))
      .map((el, indexRow) => 
        el.map((el: any, indexCol: number) => ({...el, indexRow, indexCol}))
      );
      setGrid(matrix);
  }, [dimension, setGrid])

  // Count the neighbors active cells
  const countNeighborsCell = useCallback((cell: CellType, grid: CellType[][]) => {
    const right = grid[calcIndex(cell.indexRow + 1, dimension)][cell.indexCol]?.value;
    const left = grid[calcIndex(cell.indexRow - 1, dimension)][cell.indexCol]?.value;
    const down = grid[cell.indexRow][calcIndex(cell.indexCol + 1, dimension)]?.value;
    const up = grid[cell.indexRow][calcIndex(cell.indexCol - 1, dimension)]?.value;

    const upLeft = grid[calcIndex(cell.indexRow - 1, dimension)][calcIndex(cell.indexCol - 1, dimension)]?.value;
    const upRight = grid[calcIndex(cell.indexRow - 1, dimension)][calcIndex(cell.indexCol + 1, dimension)]?.value;
    const downLeft = grid[calcIndex(cell.indexRow + 1, dimension)][calcIndex(cell.indexCol - 1, dimension)]?.value;
    const downRight = grid[calcIndex(cell.indexRow + 1, dimension)][calcIndex(cell.indexCol + 1, dimension)]?.value;
    
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
  }, [dimension])

  // Game start!
  const gameOfLifeLogicStart = useCallback((grid?: CellType[][]) => {
    if(grid) {
      const newGrid = grid.map((row) => 
        row.map((cell: any) => {
          const neighbors = countNeighborsCell(cell, grid);
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
    }
  }, [countNeighborsCell])

  return { 
    gameOfLifeLogicStart,
    grid,
    setInitialGrid,
    setGrid,
    dimension,
  };
}

export default useGameOfLife;