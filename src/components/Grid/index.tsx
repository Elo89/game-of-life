import Cell from '../Cell';
import { CellType } from '../../containers/GameOfLife';
import { GridWrap, Row } from './styles';

interface GridProps { 
  grid?: CellType[][], 
  setGrid: (v: CellType[][]) => void
  activeCell: number
  setActiveCell: (n: number) => void
};

function Grid({ grid, setGrid, activeCell, setActiveCell }: GridProps) {
  return (
    <GridWrap>
      {grid?.map((row, indexRow) => (
        <Row key={indexRow}>
          {row?.map(({ value }, indexCol) => (
            <Cell 
              key={indexCol}
              value={value}
              indexRow={indexRow}
              indexCol={indexCol}
              setGrid={setGrid}
              grid={grid}
              setActiveCell={setActiveCell}
              activeCell={activeCell}
            />
          ))}
        </Row>
      ))}
    </GridWrap>
  );
}

export default Grid;
