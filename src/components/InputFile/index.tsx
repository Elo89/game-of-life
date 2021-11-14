import { CellType } from '../../containers/GameOfLife';

interface InputFileProps { 
  setActiveCell: (n: number) => void
  setGridSize: (s: {row: number, col: number}) => void
  setInitialValues: (v: CellType[][]) => void
};

const InputFile = ({setActiveCell, setGridSize, setInitialValues}: InputFileProps) => {
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const file = event.target.result;
      const allLines = file.split(/\r\n|\n/);
      const arrayRow: [] | CellType[][] = [];
      // Reading line by line
      allLines.forEach((line: string, index: number) => {

        if (index === 0) {
          const activeCell = Number(line.match(/\d+/g));
          setActiveCell(activeCell);
        } else if (index === 1) {
          const splitLine = line.split(" ");
          const row = Number(splitLine[0]);
          const col = Number(splitLine[1]);
          setGridSize({ row, col });
        } else if (index > 1 && line.length) {
          const row = line.split("").map((value, col) => {
            return { indexRow: index - 2, indexCol: col, value: value === '.' ? false : true}
          }) as never;

          arrayRow.push(row);
        }
      });
      setInitialValues(arrayRow);
    };

    reader.onerror = (event: any) => {
      alert(event.target.error.name);
    };

    reader.readAsText(file);
  }
  
  return (
    <input type="file" onChange={handleChange} />
  );
}

export default InputFile;
