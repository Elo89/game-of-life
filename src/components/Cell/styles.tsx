import styled from 'styled-components';

interface CellWrapProps {
  value: boolean
}

export const CellWrap = styled.div<CellWrapProps>`
  background: ${({value}) => value ? 'yellow' : 'blue'};
  height: 10px;
  width: 10px;
  border: 1px solid black;
  display: inline-block;
  padding: 0;
  margin: 0;
`;