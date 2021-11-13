import styled from 'styled-components';

export const FooterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
`;

interface ButtonProps {
  reset?: boolean
}

export const Button = styled.button<ButtonProps>`
  border: none;
  background: ${({ reset }) => reset ? 'red' : 'blue'};
  color: white;
  padding: 10px;
  min-width: 200px;
  margin-bottom: 10px;
`;

export const Timer = styled.div`
  margin: 10px;
  font-weight: bold;
`;