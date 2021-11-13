import Cell from '../Cell';
import { CellType } from '../../containers/GameOfLife';
import { GridWrap, Row } from './styles';

interface GridProps { 
  grid?: CellType[][], 
  setGrid: (v: CellType[][]) => void
};

function Grid({ grid, setGrid }: GridProps) {
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
            />
          ))}
        </Row>
      ))}
    </GridWrap>
  );
}

export default Grid;
