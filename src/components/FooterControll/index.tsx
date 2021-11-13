import { Button, FooterWrap, Timer } from './styles';

interface FooterControllProps { 
  time: number,
  setStateTimer: (n: boolean) => void,
  resetter: () => void,
  stateTimer: boolean,
};

function FooterControll({ time, setStateTimer, stateTimer, resetter }: FooterControllProps) {
  return (
    <FooterWrap>
      <Timer>Timer: {time}</Timer>
      <Button onClick={() => setStateTimer(!stateTimer)}>{stateTimer ? 'STOP': 'START'}</Button>
      <Button onClick={resetter} reset>RESET</Button>
    </FooterWrap>  
  );
}

export default FooterControll;
