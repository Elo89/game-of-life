import { Button, FooterWrap, Label } from './styles';

interface FooterControllProps { 
  time: number,
  setStateTimer: (n: boolean) => void,
  resetter: () => void,
  stateTimer: boolean,
  activeCell: number,
};

function FooterControll({ time, setStateTimer, stateTimer, resetter, activeCell }: FooterControllProps) {
  return (
    <FooterWrap>
      <Label>Timer: {time}</Label>
      <Label>Celle Attive: {activeCell}</Label>
      <Button onClick={() => setStateTimer(!stateTimer)}>{stateTimer ? 'STOP': 'START'}</Button>
      <Button onClick={resetter} reset>RESET</Button>
    </FooterWrap>  
  );
}

export default FooterControll;
