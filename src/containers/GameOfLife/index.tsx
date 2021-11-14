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
};

const GameOfLife = ({ row, col, initialValues, initialTime }: GameOfLifeProps) => {
  const { gameOfLifeLogicStart, grid, setGrid, setInitialGrid } = useGameOfLife({ row, col, initialValues });
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
      <Grid grid={grid} setGrid={setGrid} />

      <FooterControll 
        time={time} 
        setStateTimer={setStateTimer} 
        stateTimer={stateTimer} 
        resetter={resetter} 
      />
    </>  
  );
}

export default GameOfLife;
