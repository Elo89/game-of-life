import { useCallback, useEffect } from 'react';
import useTimer from '../../hooks/useTimer';
import Grid from '../../components/Grid';
import FooterControll from '../../components/FooterControll';
import useGameOfLife from '../../hooks/useGameOfLife';

export interface CellType {
  value: boolean,
  indexRow: number,
  indexCol: number,
};

interface GameOfLifeProps { 
  row: number,
  col: number,
  initialValues?: CellType[][],
  initialTime: number,
  activeCell: number,
  setActiveCell: (n: number) => void
};

const GameOfLife = ({ row, col, initialValues, initialTime, activeCell, setActiveCell }: GameOfLifeProps) => {
  const { gameOfLifeLogicStart, grid, setGrid, setInitialGrid } = useGameOfLife({ row, col, initialValues, setActiveCell });
  const stepGame = useCallback(() => gameOfLifeLogicStart(grid), [gameOfLifeLogicStart, grid]);
  const { time, resetTimer, setStateTimer, stateTimer } = useTimer({ 
    callback: stepGame,
    interval: 1000,
    initialTime,
  })

  useEffect(() => {
    setInitialGrid();
  }, [setInitialGrid]);
  
  const resetter = useCallback(() => {
    resetTimer();
    setInitialGrid();
  }, [resetTimer, setInitialGrid])

  return (
    <>
      <Grid 
        grid={grid}
        setGrid={setGrid}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
      />

      <FooterControll
        time={time} 
        setStateTimer={setStateTimer} 
        stateTimer={stateTimer} 
        resetter={resetter}
        activeCell={activeCell}
      />
    </>  
  );
}

export default GameOfLife;
