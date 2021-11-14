import { useCallback, useState } from 'react';
import Switch from "react-switch";
import InputFile from '../InputFile';
import { CellType } from '../../containers/GameOfLife';
import { Label, SwitchLabel, SwitchWrap, Wrap } from './styles';

interface SwitchFormProps { 
  setTime: (t: number) => void
  setGridSize: (s: {row?: number, col?: number}) => void
  setInitialValues: (v: CellType[][]) => void
  size: {row?: number, col?: number},
  reset: () => void
};

function SwitchForm({
  setTime,
  setGridSize,
  setInitialValues,
  size,
  reset,
}: SwitchFormProps) {
  const [mode, setMode] = useState<"custom" | "file">("file");

  const handleChange = useCallback((checked) => {
    setMode(checked ? 'file' : 'custom');
    reset();
  }, [reset])
  
  return (
    <Wrap>
      <SwitchWrap>
        <SwitchLabel>Custom</SwitchLabel>
        <Switch 
          onChange={handleChange}
          checked={mode === 'file'}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
        <SwitchLabel>File</SwitchLabel>
      </SwitchWrap>
      {mode === 'file' &&
        <InputFile  
          setTime={setTime}
          setGridSize={setGridSize}
          setInitialValues={setInitialValues}
        />
      }
      {mode === 'custom' &&
        <div>
          <Label>Row</Label>
          <input type="number" onChange={(e) => setGridSize({ row: Number(e.target.value), col: size?.col})} />
          <Label>Column</Label>
          <input type="number" onChange={(e) => setGridSize({ row: size?.row, col: Number(e.target.value)})} />
        </div>
      }
    </Wrap>
  );
}

export default SwitchForm;
