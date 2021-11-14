import { useCallback, useState } from 'react';
import SwitchForm from '../../components/SwitchForm';
import GameOfLife, { CellType } from '../GameOfLife';

function App() {
  const [time, setTime] = useState<number>();
  const [size, setGridSize] = useState<{row?: number, col?: number}>({});
  const [initialValues, setInitialValues] = useState<CellType[][]>();

  const reset = useCallback(() => {
    setTime(undefined);
    setGridSize({});
    setInitialValues(undefined);
  }, [setTime, setGridSize, setInitialValues])
  
  return (
    <div>
      <SwitchForm
        setTime={setTime}
        setGridSize={setGridSize}
        setInitialValues={setInitialValues}
        size={size}
        reset={reset}
      />
      {size?.row && size?.col &&
        <GameOfLife 
          row={size?.row}
          col={size?.col}
          initialValues={initialValues}
          initialTime={time || 0} 
        />
      }
    </div>
  );
}

export default App;
